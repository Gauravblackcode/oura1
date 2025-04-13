/* eslint-disable no-console */
const { spawnSync } = require('child_process');

try {
  const result = spawnSync('yarn', ['audit', '--json'], { encoding: 'utf-8' });
  if (result.error) {
    throw result.error;
  }

  // Parse the audit result
  const findings = result.stdout
    .split('\n')
    .filter(line => line.trim().startsWith('{'))
    .map(line => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return null;
      }
    })
    .filter(entry => entry && entry.type === 'auditAdvisory')
    .map(entry => entry.data.advisory);

  // If vulnerabilities are detected, log them in a table format
  if (findings.length > 0) {
    console.error('🚨 Vulnerabilities detected:');
    console.table(
      findings.map(issue => ({
        Severity: issue.severity.toUpperCase(),
        Package: issue.module_name,
        'Patched in': issue.patched_versions || 'N/A',
        'Dependency of': issue.path || 'N/A',
        Path: issue.path || 'N/A',
        'More info': issue.url,
      })),
    );
    process.exit(1); // Exit with code 1 to prevent commit if issues are found
  }

  // If no vulnerabilities are found, log success
  console.log('✅ No vulnerabilities detected.');
} catch (error) {
  console.error('Error running yarn audit:', error.message);
  process.exit(1); // Exit with code 1 if an error occurs
}
