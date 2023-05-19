import AWS, { ConfigurationOptions } from 'aws-sdk';


interface CustomConfigurationOptions extends ConfigurationOptions {
  region: string;
  endpoint: string;
}

export function configureDynamoDB() {
  const config: CustomConfigurationOptions = {
    region: 'local',
    endpoint: 'http://localhost:8000',
  };

  // Configure the AWS SDK with the local DynamoDB endpoint
  AWS.config.update(config);
}