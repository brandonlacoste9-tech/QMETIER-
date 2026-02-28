# Telegram Bot Integration

Enable professionals to interact with Q-MÉTIER via Telegram for job notifications, quote submissions, and customer communication.

## Requirements

### Bot Commands
- `/start` - Welcome message and bot introduction
- `/register` - Create professional profile via chat
- `/balance` - Check current credit balance
- `/credits` - Purchase credit packs with inline buttons
- `/jobs` - View available matching jobs
- `/help` - Show all available commands

### Notifications
- New project matches (push notifications)
- Quote acceptance notifications
- Customer messages
- Credit purchase confirmations
- Job status updates

### Interactive Features
- Inline keyboard buttons for quick actions
- Quote submission via chat interface
- Credit purchase with Stripe integration
- Job acceptance with one tap
- Real-time chat with customers

### API Integration
- Webhook endpoint for receiving notifications from main API
- Professional lookup by Telegram ID
- Quote submission endpoint
- Credit balance queries
- Job matching queries

## Technical Implementation

### Bot Service
- Python with python-telegram-bot library
- Async handlers for commands and callbacks
- State management for multi-step flows (registration, quotes)
- Error handling and logging

### Database Changes
- Add `telegram_id` field to Professional model
- Index on telegram_id for fast lookups

### API Endpoints
- POST /telegram/notify - Send notification to professional
- GET /professionals/telegram/{telegram_id} - Get profile by Telegram ID

### Docker Service
- Separate container for Telegram bot
- Webhook server for receiving API notifications
- Auto-restart on failure

## User Flows

### Registration Flow
1. User sends `/register` command
2. Bot requests profile information
3. User sends formatted text with name, email, skills, location
4. Bot creates professional profile via API
5. Confirmation message sent

### Job Notification Flow
1. Customer creates project on web
2. Matcher service finds matching professionals
3. API sends notification to Telegram bot
4. Bot sends formatted job card with buttons
5. Professional can view details or submit quote

### Quote Submission Flow
1. Professional taps "Submit Quote" button
2. Bot requests quote details (amount, message)
3. Professional sends formatted quote
4. Bot submits to API (deducts credits)
5. Confirmation sent

### Credit Purchase Flow
1. Professional sends `/credits` command
2. Bot shows inline buttons with pack options
3. Professional selects pack
4. Bot creates Stripe session via API
5. Payment link sent to user
6. Webhook confirms payment
7. Credits added to balance

## Tests
- Unit tests for command handlers
- Integration tests for API communication
- Mock Telegram updates for testing flows
- Webhook notification tests
