/**
 * Common module boundary rules based on project types.
 */
const typeConstraints = [
  {
    sourceTag: 'type:application',
    onlyDependOnLibsWithTags: ['type:feature', 'type:store', 'type:data-access', 'type:ui', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:feature',
    onlyDependOnLibsWithTags: ['type:store', 'type:data-access', 'type:ui', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:ui',
    onlyDependOnLibsWithTags: ['type:store', 'type:data-access', 'type:ui', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:data-access',
    onlyDependOnLibsWithTags: ['type:data-access', 'type:ui', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:store',
    onlyDependOnLibsWithTags: ['type:data-access', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:util',
    onlyDependOnLibsWithTags: ['type:data-access', 'type:ui', 'type:util'],
  },
  {
    sourceTag: 'type:e2e',
    onlyDependOnLibsWithTags: ['type:util'],
  },
];

/**
 * Shared module boundary rules based on scopes.
 */
const sharedConstraints = [
  {
    sourceTag: 'scope:proto',
    onlyDependOnLibsWithTags: [],
  },
];

/**
 * Backend module boundary rules based on scopes.
 */
const backendConstraints = [
  {
    sourceTag: 'scope:api',
    onlyDependOnLibsWithTags: [
      'scope:proto',
      'scope:backend-auth',
      'scope:backend-core',
      'scope:backend-github',
      'scope:backend-grpc',
      'scope:backend-mailer',
      'scope:backend-interfaces',
      'scope:backend-logger',
      'scope:backend-websocket',
    ],
  },
  {
    sourceTag: 'scope:backend-auth',
    onlyDependOnLibsWithTags: ['scope:proto', 'scope:backend-interfaces'],
  },
  {
    sourceTag: 'scope:backend-core',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:backend-github',
    onlyDependOnLibsWithTags: ['scope:proto', 'scope:backend-auth', 'scope:backend-interfaces'],
  },
  {
    sourceTag: 'scope:backend-grpc',
    onlyDependOnLibsWithTags: ['scope:proto', 'scope:backend-interfaces'],
  },
  {
    sourceTag: 'scope:backend-interfaces',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:backend-logger',
    onlyDependOnLibsWithTags: ['scope:proto'],
  },
  {
    sourceTag: 'scope:backend-mailer',
    onlyDependOnLibsWithTags: ['scope:proto', 'scope:backend-core', 'scope:backend-interfaces'],
  },
  {
    sourceTag: 'scope:backend-websocket',
    onlyDependOnLibsWithTags: ['scope:proto', 'scope:backend-interfaces'],
  },
];

/**
 * Client module boundary rules based on scopes.
 */
const clientConstraints = [
  {
    sourceTag: 'scope:documentation',
    onlyDependOnLibsWithTags: ['scope:client-material', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:documentation-e2e',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
  {
    sourceTag: 'scope:client-unit-testing',
    onlyDependOnLibsWithTags: ['scope:client-util', 'scope:client-material'],
  },
  {
    sourceTag: 'scope:client-material',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:client-core',
    onlyDependOnLibsWithTags: ['scope:client-util', 'scope:client-store'],
  },
  {
    sourceTag: 'scope:client-store',
    onlyDependOnLibsWithTags: [
      'scope:client-unit-testing',
      'scope:proto',
      'scope:client-util',
      'scope:client-translate',
      'scope:client-interfaces',
    ],
  },
  {
    sourceTag: 'scope:client-interfaces',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:client-services',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util', 'scope:proto'],
  },
  {
    sourceTag: 'scope:client-chatbot',
    onlyDependOnLibsWithTags: [
      'scope:client-chatbot-store',
      'scope:client-unit-testing',
      'scope:proto',
      'scope:client-material',
      'scope:client-translate',
    ],
  },
  {
    sourceTag: 'scope:client-chatbot-store',
    onlyDependOnLibsWithTags: ['scope:client-util', 'scope:proto'],
  },
  {
    sourceTag: 'scope:client-componnents',
    onlyDependOnLibsWithTags: [
      'scope:client-unit-testing',
      'scope:client-core',
      'scope:client-material',
      'scope:client-store',
      'scope:client-chatbot-store',
      'scope:client-util',
    ],
  },
  {
    sourceTag: 'scope:client-d3-charts',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
  {
    sourceTag: 'scope:client-diagnostics',
    onlyDependOnLibsWithTags: [
      'scope:client-unit-testing',
      'scope:proto',
      'scope:client-core',
      'scope:client-material',
      'scope:client-store',
      'scope:client-services',
      'scope:client-util',
      'scope:client-translate',
    ],
  },
  {
    sourceTag: 'scope:client-util',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:client-translate',
    onlyDependOnLibsWithTags: ['scope:client-material', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client',
    onlyDependOnLibsWithTags: [
      'scope:client-unit-testing',
      'scope:proto',
      'scope:client-store',
      'scope:client-services',
      'scope:client-chatbot',
      'scope:client-components',
      'scope:client-core',
      'scope:client-diagnostics',
      'scope:client-material',
      'scope:client-translate',
      'scope:client-util',
      'scope:client-sidebar',
    ],
  },
  {
    sourceTag: 'scope:portfolio',
    onlyDependOnLibsWithTags: [
      'scope:client-store',
      'scope:client-core',
      'scope:client-chatbot',
      'scope:client-components',
      'scope:client-material',
      'scope:client-translate',
      'scope:client-unit-testing',
      'scope:client-util',
      'scope:client-portfolio',
      'scope:client-services',
    ],
  },
  {
    sourceTag: 'scope:client-portfolio',
    onlyDependOnLibsWithTags: [
      'scope:proto',
      'scope:client-d3-charts',
      'scope:client-store',
      'scope:client-core',
      'scope:client-material',
      'scope:client-interfaces',
      'scope:client-translate',
      'scope:client-unit-testing',
      'scope:client-util',
    ],
  },
  {
    sourceTag: 'scope:client-e2e',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
  {
    sourceTag: 'scope:client-components-e2e',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
];

/**
 * Nrwl nx module boudary rules.
 */
exports.nxModuleBoundaryRules = {
  enforceBuildableLibDependency: true,
  allow: [],
  depConstraints: [...sharedConstraints, ...clientConstraints, ...backendConstraints, ...typeConstraints],
};
