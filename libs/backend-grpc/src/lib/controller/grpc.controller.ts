import { mono } from '@mono/proto';
import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { from, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { MONO_GRPC_PACKAGE } from '../grpc-client.options';

export interface IEntityService {
  findOne(data: mono.IEntityById): Observable<mono.IEntity>;
  findMany(upstream: Observable<mono.IEntityById>): Observable<mono.IEntity>;
}

@Controller('grpc')
export class BackendGrpcController implements OnModuleInit {
  private readonly items: mono.IEntity[] = [
    {
      id: 'id1',
      num1: 1,
      num2: 3,
      boolean1: true,
      float1: 0.5,
      any1: null,
      subEntities: [],
    },
    {
      id: 'id2',
      num1: 2,
      num2: 4,
      boolean1: false,
      float1: 1.5,
      any1: null,
      subEntities: [{ id: 'subid1' }],
    },
  ];

  private sampleService?: IEntityService;

  constructor(@Inject(MONO_GRPC_PACKAGE) private readonly client: ClientGrpc) {}

  public onModuleInit() {
    this.sampleService = this.client.getService<IEntityService>('EntityService');
  }

  @Get()
  public getMany(): Observable<mono.IEntity[]> {
    const ids$ = new ReplaySubject<mono.IEntityById>();
    ids$.next({ id: 'id1' });
    ids$.next({ id: 'id2' });
    ids$.complete();

    return typeof this.sampleService !== 'undefined'
      ? this.sampleService.findMany(ids$.asObservable()).pipe(toArray())
      : of([]);
  }

  @Get(':id')
  public getById(@Param('id') id: string): Observable<mono.IEntity> {
    return typeof this.sampleService !== 'undefined'
      ? from(this.sampleService.findOne({ id }))
      : of(
          mono.Entity.toObject(new mono.Entity(), {
            defaults: true,
          }),
        );
  }

  @GrpcMethod('EntityService', 'FindOne')
  public findOne(
    data: mono.IEntityById,
    metadata: Record<string, unknown>,
  ): mono.IEntity | undefined {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('EntityService', 'FindMany')
  public findMany(
    data$: Observable<mono.IEntityById>,
    metadata: Record<string, unknown>,
  ): Observable<mono.IEntity> {
    const entity$ = new Subject<mono.IEntity>();

    const onNext = (entityById: mono.IEntityById) => {
      const item = this.items.find(({ id }) => id === entityById.id);
      entity$.next(item);
    };
    const onComplete = () => {
      entity$.complete();
    };
    void data$.subscribe(onNext, null, onComplete);

    return entity$.asObservable();
  }
}
