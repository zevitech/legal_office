# Payment Bypass Mode for Testing

This guide explains how to use the payment bypass feature for testing purposes.

## Overview

The payment bypass mode allows you to test the complete form submission flow without making actual payments. This is useful for:

- Testing the form flow during development
- QA testing without using real payment methods
- Demonstrating the application to stakeholders
- Debugging payment-related issues

## How to Enable Payment Bypass Mode

1. Open the `.env` file in your project root
2. Find the line: `NEXT_PUBLIC_PAYMENT_BYPASS_MODE=false`
3. Change it to: `NEXT_PUBLIC_PAYMENT_BYPASS_MODE=true`
4. Restart your development server

## What Happens When Bypass Mode is Enabled

### In Step Four (Final Form Step):
- When you click "Next", the form will skip the payment page entirely
- It will automatically mark the payment as completed
- You'll be redirected directly to the thank-you page
- The data will be saved with `payment_bypass: true` and `payment_method: 'TESTING_BYPASS'`

### In Payment Page:
- If you manually navigate to `/trademark-register/payment`, you'll see a testing interface
- The page will display "PAYMENT BYPASS MODE ACTIVE" banner
- You'll see the order summary with all selected items and total amount
- A "Continue to Thank You Page (Testing)" button will be available

### In Thank You Page:
- The title will change from "Thank You, Payment Completed!" to "Thank You, Application Submitted!"
- A yellow warning banner will appear showing "Payment bypass mode is active. This is for testing purposes only."
- The receipt will still show all the order details and selected plan information

## Security Considerations

⚠️ **IMPORTANT**: Always ensure payment bypass mode is **DISABLED** in production:
- Set `NEXT_PUBLIC_PAYMENT_BYPASS_MODE=false` in production environment
- Never commit bypass mode enabled to version control for production branches
- Consider adding additional server-side validation to prevent bypass in production

## Testing Checklist

When testing with bypass mode:
- [ ] Form data is properly collected and saved
- [ ] Receipt shows correct plan details and pricing
- [ ] All form steps work correctly
- [ ] Data is sent to your backend/API endpoints
- [ ] Thank you page displays properly
- [ ] Receipt download functionality works

## Disabling Bypass Mode

To return to normal payment processing:
1. Set `NEXT_PUBLIC_PAYMENT_BYPASS_MODE=false` in `.env`
2. Restart your server
3. The normal payment flow will be restored

## Environment Variables

```bash
# Payment bypass mode (true = enabled, false = disabled)
NEXT_PUBLIC_PAYMENT_BYPASS_MODE=false
```

## Files Modified

The following files were modified to implement this feature:
- `components/form/steps/StepFour.jsx` - Added bypass logic in form submission
- `components/form/steps/Payment.jsx` - Added bypass mode UI and redirect
- `components/form/steps/ThankYou.jsx` - Added bypass mode messaging
- `.env` - Added bypass mode environment variable