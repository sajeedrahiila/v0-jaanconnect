# Odoo 19 Backend Integration Guide

This guide will help you connect your JaanConnect frontend to your on-premise Odoo 19 Community Edition backend.

## Prerequisites

- Odoo 19 Community Edition installed and running
- Odoo instance accessible via HTTP/HTTPS
- Database created in Odoo

## Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Odoo Backend Configuration
NEXT_PUBLIC_ODOO_URL=http://your-odoo-server:8069
NEXT_PUBLIC_ODOO_DB=your_database_name
```

### Example configurations:

**Local Development:**
```env
NEXT_PUBLIC_ODOO_URL=http://localhost:8069
NEXT_PUBLIC_ODOO_DB=odoo
```

**Production (On-Premise):**
```env
NEXT_PUBLIC_ODOO_URL=https://odoo.yourcompany.com
NEXT_PUBLIC_ODOO_DB=production_db
```

## Odoo Configuration

### 1. Enable CORS (Cross-Origin Resource Sharing)

Add this to your Odoo configuration file (`odoo.conf` or `odoo-server.conf`):

```ini
[options]
# ... other configuration ...

# Allow your frontend domain
dbfilter = ^%d$
list_db = False

# For development (allows all origins)
# Remove in production and specify your frontend domain
proxy_mode = True
```

### 2. Install Required Modules

In your Odoo instance, install these modules:
- **Website** (for public user access)
- **Portal** (for customer portal access)
- **Auth Signup** (for user registration)

### 3. Configure Authentication Settings

Go to **Settings → General Settings → Integrations**:
- Enable "Customer Account"
- Enable "Free sign up"
- Configure "Reset Password" settings

### 4. API Access Configuration

#### Option A: Use Standard Odoo Authentication (Recommended)
The provided `lib/odoo-api.ts` uses standard Odoo session authentication:
- `/web/session/authenticate` - for login
- `/web/signup` - for registration
- `/web/session/destroy` - for logout

No additional configuration needed!

#### Option B: Custom REST API (Advanced)
If you need custom endpoints, create a custom Odoo controller:

```python
# In your Odoo custom module
from odoo import http
from odoo.http import request

class CustomAPI(http.Controller):
    
    @http.route('/api/auth/login', type='json', auth='public', methods=['POST'])
    def api_login(self, email, password):
        try:
            request.session.authenticate(request.db, email, password)
            user = request.env.user
            return {
                'success': True,
                'user': {
                    'id': user.id,
                    'name': user.name,
                    'email': user.email,
                    'partner_id': user.partner_id.id,
                }
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    @http.route('/api/auth/register', type='json', auth='public', methods=['POST'])
    def api_register(self, name, email, password):
        try:
            # Create partner
            partner = request.env['res.partner'].sudo().create({
                'name': name,
                'email': email,
            })
            
            # Create user
            user = request.env['res.users'].sudo().create({
                'name': name,
                'login': email,
                'password': password,
                'partner_id': partner.id,
            })
            
            return {'success': True, 'user_id': user.id}
        except Exception as e:
            return {'success': False, 'error': str(e)}
```

## Testing the Connection

### 1. Start Your Odoo Instance
```bash
# From your Odoo directory
./odoo-bin -c odoo.conf
```

### 2. Start Your Frontend
```bash
npm run dev
```

### 3. Test Authentication
1. Navigate to `http://localhost:3000/login`
2. Try creating a new account
3. Try logging in with an existing Odoo user

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:

1. **Add CORS headers to Odoo:**
   Create a custom module with this controller:

```python
from odoo import http

class CORSController(http.Controller):
    @http.route('/web/session/authenticate', type='json', auth='none', cors='*')
    def authenticate(self, **kwargs):
        # Your authentication logic
        pass
```

2. **Use Nginx as reverse proxy:**
```nginx
location /odoo/ {
    proxy_pass http://localhost:8069/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
    # CORS headers
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type' always;
}
```

### Session Not Persisting
Make sure you have:
- `credentials: 'include'` in all fetch calls (already configured)
- Cookies enabled in your browser
- Same-site cookie policy configured if using HTTPS

### Connection Refused
- Verify Odoo is running: `curl http://localhost:8069`
- Check firewall settings
- Verify the URL in `.env.local` is correct

## Security Best Practices

### Production Deployment

1. **Use HTTPS:** Always use SSL/TLS in production
   ```env
   NEXT_PUBLIC_ODOO_URL=https://odoo.yourcompany.com
   ```

2. **Restrict CORS:** Don't use `cors='*'` in production. Specify your frontend domain:
   ```python
   cors='https://yourfrontend.com'
   ```

3. **Use Database Filters:** In `odoo.conf`:
   ```ini
   dbfilter = ^production_db$
   list_db = False
   ```

4. **Enable Rate Limiting:** Protect your authentication endpoints from brute force attacks

5. **Use Secure Cookies:**
   ```ini
   session_cookie_httponly = True
   session_cookie_secure = True
   session_cookie_samesite = Strict
   ```

## Next Steps

### Extend API Integration
The `lib/odoo-api.ts` file includes a helper function `callOdooAPI()` for making custom API calls:

```typescript
import { callOdooAPI } from '@/lib/odoo-api'

// Example: Fetch products
const products = await callOdooAPI('/api/products', 'GET')

// Example: Create an order
const order = await callOdooAPI('/api/orders', 'POST', {
  partner_id: 123,
  order_lines: [...]
})
```

### Data Models
Map your frontend data to Odoo models:
- **Users** → `res.users`
- **Customers** → `res.partner`
- **Products** → `product.template` / `product.product`
- **Orders** → `sale.order`
- **Invoices** → `account.move`

### Recommended Odoo Modules for Service Marketplace
- **Project** - for service project management
- **Helpdesk** - for customer support
- **Website** - for public listings
- **Appointments** - for booking services

## Support

For Odoo-specific issues, refer to:
- [Odoo 19 Documentation](https://www.odoo.com/documentation/19.0/)
- [Odoo Community Forum](https://www.odoo.com/forum)

For frontend issues, check the Next.js documentation or create an issue in your repository.
