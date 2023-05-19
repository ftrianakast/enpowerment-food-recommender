import AWS, { ConfigurationOptions } from 'aws-sdk';

interface CustomConfigurationOptions extends ConfigurationOptions {
  region: string;
  endpoint: string;
}

const config: CustomConfigurationOptions = {
  region: 'local',
  endpoint: 'http://localhost:8000',
};

export function configureDynamoDB() {
  // Configure the AWS SDK with the local DynamoDB endpoint
  AWS.config.update(config);
}