#!/bin/bash

# This file is run by the cron inside a docker file

/usr/local/bin/node --env-file=.env scripts/notifyDiscord.js >> /var/log/cron.log 2>&1
/usr/local/bin/node --env-file=.env scripts/discordHealthcheck.js >> /var/log/cron.log 2>&1