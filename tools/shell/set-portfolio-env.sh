#!/bin/bash

##
# Color definitions.
##
source tools/shell/colors.sh
##
# Printing utility functions.
##
source tools/shell/print-utils.sh

if [ 9 -eq $# ]; then
  GITHUB_ACCESS_TOKEN=$1
  MAILER_HOST=$2
  MAILER_PORT=$3
  MAILER_EMAIL=$4
  MAILER_CLIENT_ID=$5
  MAILER_CLIENT_SECRET=$6
  MAILER_REFRESH_TOKEN=$7
  MAILER_ACCESS_TOKEN=$8
  MAILER_RECIPIENT_EMAIL=$9

  printInfoTitle "You provided the following values:"
  printNameAndValue "GITHUB_ACCESS_TOKEN" "$GITHUB_ACCESS_TOKEN"
  printNameAndValue "MAILER_HOST" "$MAILER_HOST"
  printNameAndValue "MAILER_PORT" "$MAILER_PORT"
  printNameAndValue "MAILER_EMAIL" "$MAILER_EMAIL"
  printNameAndValue "MAILER_CLIENT_ID" "$MAILER_CLIENT_ID"
  printNameAndValue "MAILER_CLIENT_SECRET" "$MAILER_CLIENT_SECRET"
  printNameAndValue "MAILER_REFRESH_TOKEN" "$MAILER_REFRESH_TOKEN"
  printNameAndValue "MAILER_ACCESS_TOKEN" "$MAILER_ACCESS_TOKEN"
  printNameAndValue "MAILER_RECIPIENT_EMAIL" "$MAILER_RECIPIENT_EMAIL"
  printGap

  # write functions .env
  {
    echo "GITHUB_ACCESS_TOKEN=${GITHUB_ACCESS_TOKEN}"
    echo "MAILER_HOST=${MAILER_HOST}"
    echo "MAILER_PORT=${MAILER_PORT}"
    echo "MAILER_EMAIL=${MAILER_EMAIL}"
    echo "MAILER_CLIENT_ID=${MAILER_CLIENT_ID}"
    echo "MAILER_CLIENT_SECRET=${MAILER_CLIENT_SECRET}"
    echo "MAILER_REFRESH_TOKEN=${MAILER_REFRESH_TOKEN}"
    echo "MAILER_ACCESS_TOKEN=${MAILER_ACCESS_TOKEN}"
    echo "MAILER_RECIPIENT_EMAIL=${MAILER_RECIPIENT_EMAIL}"
  } >./functions/.env

  printSuccessTitle "OK: environment variables set in"
  printGap
  cat ./functions/.env
  printGap
else
  printErrorTitle "ERROR: 9 arguments expected:"
  printInfoMessage "- GITHUB_ACCESS_TOKEN"
  printInfoMessage "- MAILER_HOST"
  printInfoMessage "- MAILER_PORT"
  printInfoMessage "- MAILER_EMAIL"
  printInfoMessage "- MAILER_CLIENT_ID"
  printInfoMessage "- MAILER_CLIENT_SECRET"
  printInfoMessage "- MAILER_REFRESH_TOKEN"
  printInfoMessage "- MAILER_ACCESS_TOKEN"
  printInfoMessage "- MAILER_RECIPIENT_EMAIL"
  printGap
fi
