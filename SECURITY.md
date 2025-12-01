# Security Documentation

## Security Enhancements Implemented

### 1. Authentication & Authorization

#### JWT Token Security
- **Location**: `server/auth.ts`
- JWT_SECRET is required and validated on startup
- Tokens expire after 7 days
- Tokens include user role and company for authorization
- Password hashing using bcryptjs (10 rounds)

#### Role-Based Access Control (RBAC)
Three roles implemented:
- `super_admin` - Platform-wide access
- `admin` - Company-level management
- `user` - Standard trainee access

#### Middleware Protection
- `authMiddleware` - Verifies JWT token
- `adminMiddleware` - Requires admin or super_admin role
- `companyAdminMiddleware` - Company-specific admin access
- `superAdminMiddleware` - Platform-wide admin access

### 2. Rate Limiting

**General API Rate Limit**:
- 100 requests per 15 minutes per IP
- Applied to all `/api/*` routes

**Authentication Rate Limit**:
- 5 login attempts per 15 minutes per IP
- Prevents brute force attacks
- Skips counting on successful requests

### 3. HTTP Security Headers (Helmet)

Implemented headers:
- X-DNS-Prefetch-Control
- X-Frame-Options
- Strict-Transport-Security
- X-Download-Options
- X-Content-Type-Options
- X-XSS-Protection
- Content-Security-Policy (disabled for Vite compatibility)

### 4. CORS Configuration

- Development: Allows all origins
- Production: Restricts to ALLOWED_ORIGINS environment variable
- Credentials enabled for cookie/auth support

### 5. Input Validation

#### Server-Side Validation
- **Framework**: Zod schemas
- **Location**: `shared/schema.ts`
- All API inputs validated against TypeScript types
- Automatic sanitization through Zod parsing

#### SQL Injection Protection
- **ORM**: Drizzle ORM with parameterized queries
- No raw SQL concatenation
- Type-safe query builder

#### File Upload Security
- File size limits: 10MB max for request body
- Content-type validation
- Google Cloud Storage integration with secure credentials

### 6. Error Handling

#### Production vs Development
- **Production**: Generic error messages (no stack traces)
- **Development**: Detailed error information with stack traces
- All errors logged with timestamp, method, path, status

#### Structured Error Logging
```javascript
console.error('[ERROR]', {
  timestamp: ISO timestamp,
  method: HTTP method,
  path: Request path,
  status: Status code,
  message: Error message,
  stack: Stack trace (dev only)
});
```

### 7. Environment Variable Security

#### Validation on Startup
- **File**: `server/env-validator.ts`
- Fails fast if required variables missing
- Warns about optional but important variables
- Validates JWT_SECRET strength (min 32 chars)

#### Protected Variables
- JWT_SECRET
- DATABASE_URL
- API keys (OpenAI, VAPI)
- Storage credentials

#### .gitignore Configuration
Protected from version control:
- `.env` and all variants
- Credentials files (*.pem, *.key, *.cert)
- Service account JSON files
- Database files

### 8. Multi-Tenant Security

#### Data Isolation
- All queries scoped by `companyId`
- Users can only access their company's data
- Middleware enforces company-level isolation

#### Company-Scoped Resources
- Training content
- VAPI agents
- User data
- Notes and progress

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use `.env` for local development
   - Check `.gitignore` includes `.env`
   - Use environment variables for all secrets

2. **Validate all inputs**
   - Use Zod schemas for API inputs
   - Validate file uploads
   - Sanitize user-generated content

3. **Use parameterized queries**
   - Always use Drizzle ORM methods
   - Never concatenate SQL strings
   - Use typed query builders

4. **Handle errors safely**
   - Don't leak sensitive information
   - Log errors for debugging
   - Return generic messages in production

5. **Test authentication**
   - Verify middleware protection
   - Test role-based access
   - Check token expiration

### For Operators

1. **Environment Configuration**
   ```bash
   # Generate secure JWT secret
   openssl rand -hex 32

   # Set in .env
   JWT_SECRET=<generated-value>
   ```

2. **Database Security**
   - Use SSL connections
   - Rotate database passwords regularly
   - Enable audit logging
   - Restrict network access

3. **API Keys**
   - Rotate keys quarterly
   - Use separate keys for dev/staging/prod
   - Monitor API usage
   - Set spending alerts

4. **Monitoring**
   - Watch for rate limit violations
   - Monitor failed login attempts
   - Check error logs regularly
   - Set up alerts for anomalies

5. **Regular Updates**
   ```bash
   # Check for security vulnerabilities
   npm audit

   # Fix non-breaking issues
   npm audit fix

   # Review breaking changes
   npm outdated
   ```

## Known Vulnerabilities

### Current Status
Run `npm audit` for latest security report.

**As of last check**: 6 moderate vulnerabilities in esbuild (development only)
- These are in dev dependencies only
- Not exposed in production build
- Monitor for updates to fix

### Updating Dependencies
```bash
# Safe updates
npm audit fix

# Breaking updates (test thoroughly)
npm audit fix --force
```

## Incident Response

### Security Incident Procedure

1. **Immediate Actions**
   - Rotate compromised credentials immediately
   - Enable additional logging
   - Block suspicious IPs
   - Notify team lead

2. **Investigation**
   - Check application logs
   - Review database audit logs
   - Check rate limit violations
   - Review recent deployments

3. **Remediation**
   - Apply security patches
   - Update dependencies
   - Strengthen affected systems
   - Test fixes thoroughly

4. **Post-Incident**
   - Document incident
   - Update security procedures
   - Conduct team review
   - Implement preventive measures

### Emergency Contacts
- Security Team: [Contact Info]
- On-Call Engineer: [Contact Info]
- Database Admin: [Contact Info]

## Security Audit Checklist

### Monthly Review
- [ ] Run `npm audit`
- [ ] Review access logs
- [ ] Check for unauthorized access attempts
- [ ] Verify backup integrity
- [ ] Review user permissions

### Quarterly Review
- [ ] Rotate API keys
- [ ] Update dependencies
- [ ] Security penetration testing
- [ ] Review RBAC policies
- [ ] Audit database access

### Annual Review
- [ ] Full security audit
- [ ] Update security documentation
- [ ] Review incident response plan
- [ ] Security training for team
- [ ] Third-party security assessment

## Compliance Considerations

### Data Protection
- User data encrypted at rest (database level)
- SSL/TLS for data in transit
- Password hashing (bcryptjs)
- Multi-tenant data isolation

### GDPR Considerations
If serving EU users, ensure:
- User data export capability
- Data deletion capability
- Privacy policy
- Cookie consent
- Data processing agreement

### SOC 2 Considerations
For enterprise customers:
- Audit logging
- Access controls
- Encryption
- Monitoring and alerting
- Incident response plan

## Additional Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Drizzle ORM Security](https://orm.drizzle.team/docs/security)

## Contact

For security concerns or to report vulnerabilities:
- Email: security@[your-domain].com
- Encrypted: [PGP Key if available]
- Bug Bounty: [Program URL if available]
