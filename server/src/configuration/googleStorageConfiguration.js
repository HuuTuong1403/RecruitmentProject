module.exports = {
  type: 'service_account',
  project_id: process.env.GOOGLE_STORAGE_project_id,
  private_key_id: process.env.GOOGLE_STORAGE_private_key_id,
  private_key: process.env.GOOGLE_STORAGE_private_key.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_STORAGE_client_email,
  client_id: process.env.GOOGLE_STORAGE_client_id,
  auth_uri: process.env.GOOGLE_STORAGE_auth_uri,
  token_uri: process.env.GOOGLE_STORAGE_token_uri,
  auth_provider_x509_cert_url:
    process.env.GOOGLE_STORAGE_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.GOOGLE_STORAGE_auth_client_x509_cert_url,
};
