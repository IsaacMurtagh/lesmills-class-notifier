FROM node:20
WORKDIR /usr/src/app

COPY . .
RUN npm install

# Install cron
RUN apt-get update && apt-get install -y cron
# Add your cron file
ADD crontab /etc/cron.d/my-cron-job
# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/my-cron-job
# Apply cron job
RUN crontab /etc/cron.d/my-cron-job
# Create the log file to be able to run tail
RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log
