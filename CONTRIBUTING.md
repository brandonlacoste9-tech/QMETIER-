# Contributing to DevisPro

Thank you for your interest in contributing to DevisPro, Quebec's premier construction marketplace platform! This document provides guidelines for contributing to the project.

## 🌟 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect Quebec's linguistic and cultural context
- Prioritize security and user privacy

## 🛠️ Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/thumbstack-.git
   cd thumbstack-
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your development settings
   ```

5. **Start development servers**
   ```bash
   npm start  # Backend server
   npm run automation  # OpenClaw engine (in separate terminal)
   ```

## 📝 Development Guidelines

### Code Style

- **JavaScript**: Use ES6+ features, async/await over callbacks
- **PowerShell**: Follow PowerShell best practices, use approved verbs
- **HTML/CSS**: Semantic HTML5, BEM naming for CSS classes
- **Comments**: Write in French for Quebec-specific code, English for general code

### French Localization

- All user-facing text must be in Quebec French (fr-CA)
- Use proper Quebec terminology for construction industry
- Maintain Bill 101 compliance (French priority)
- Include translations for any new UI text

### Security

- Never commit API keys or secrets
- Validate all user inputs
- Use parameterized queries (when using database)
- Follow OWASP security guidelines

## 🔄 Contribution Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, concise code
   - Add comments where necessary
   - Update documentation

3. **Test your changes**
   - Test locally with sample data
   - Verify API endpoints work
   - Test frontend UI/UX
   - Ensure no console errors

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

   Commit message format:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for improvements
   - `Docs:` for documentation
   - `Refactor:` for code refactoring

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your feature branch
   - Provide detailed description

## 🧪 Testing

Currently, the project does not have automated tests. You can contribute by:

1. **Manual Testing Checklist**
   - [ ] Backend server starts without errors
   - [ ] All API endpoints respond correctly
   - [ ] RBQ license validation works
   - [ ] Contractor registration succeeds
   - [ ] Lead submission works
   - [ ] Frontend pages load properly
   - [ ] Mobile responsiveness works

2. **Future: Automated Tests**
   - Unit tests for API functions
   - Integration tests for workflows
   - End-to-end tests for user journeys

## 📋 Areas for Contribution

### High Priority

1. **Real RBQ API Integration**
   - Replace mock validation with actual RBQ API calls
   - Handle API errors gracefully
   - Implement rate limiting

2. **Database Migration**
   - Replace JSON files with PostgreSQL or MongoDB
   - Create proper schema/models
   - Implement migrations

3. **Authentication System**
   - JWT-based authentication
   - Contractor dashboard
   - Admin panel

4. **Testing Infrastructure**
   - Jest for backend tests
   - Playwright/Cypress for E2E tests
   - CI/CD pipeline

### Medium Priority

1. **Enhanced Automation**
   - Improve OpenClaw distribution algorithm
   - Add machine learning for lead matching
   - Implement contractor scoring system

2. **Payment Integration**
   - Complete Interac e-Transfer integration
   - Add invoice generation
   - Payment tracking dashboard

3. **Notification System**
   - Complete WhatsApp integration
   - Add email notifications
   - In-app notification center

4. **Mobile App**
   - React Native app for contractors
   - Push notifications
   - Lead management on-the-go

### Low Priority

1. **Analytics Dashboard**
   - Lead statistics
   - Contractor performance metrics
   - Revenue tracking

2. **Advanced Features**
   - Contractor reviews and ratings
   - Project portfolio management
   - Customer testimonials
   - Multi-language support (English as secondary)

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to trigger the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, browser
6. **Screenshots**: If applicable

## 💡 Feature Requests

For new features, please provide:

1. **Problem**: What problem does this solve?
2. **Solution**: Proposed solution
3. **Alternatives**: Other approaches considered
4. **Quebec Context**: How it relates to Quebec market
5. **Priority**: Why is this important?

## 📚 Documentation

Help improve documentation by:

- Fixing typos and errors
- Adding missing information
- Improving clarity
- Adding examples
- Translating to English (if needed)

## 🤝 Community

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: General questions and ideas
- **Email**: dev@devispro.qc.ca for security issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## Questions?

Don't hesitate to ask questions:
- Open a GitHub Discussion
- Email: dev@devispro.qc.ca
- Check existing issues and PRs

---

**Merci de contribuer à DevisPro! / Thank you for contributing to DevisPro!**
