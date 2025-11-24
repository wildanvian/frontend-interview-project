<section id="contact" class="contact-section">
  <div class="container">
    <h2><?php esc_html_e('Get In Touch', 'frontdev-portfolio'); ?></h2>
    <div class="contact-content">
      <div class="contact-info">
        <h3><?php esc_html_e("Let's Work Together", 'frontdev-portfolio'); ?></h3>
        <p><?php esc_html_e('Ready to start your next project? I\'d love to hear from you.', 'frontdev-portfolio'); ?></p>
      </div>
      <form class="multi-step-form" id="contactForm" novalidate>
        <?php wp_nonce_field('frontdev_contact_form', 'contact_nonce'); ?>
        
        <div class="form-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="step-indicators">
            <span class="step-indicator active" aria-label="<?php esc_attr_e('Step 1: Personal Information', 'frontdev-portfolio'); ?>">1</span>
            <span class="step-indicator" aria-label="<?php esc_attr_e('Step 2: Project Details', 'frontdev-portfolio'); ?>">2</span>
            <span class="step-indicator" aria-label="<?php esc_attr_e('Step 3: Additional Information', 'frontdev-portfolio'); ?>">3</span>
          </div>
        </div>

        <!-- Step 1: Personal Information -->
        <div class="form-step active" data-step="1">
          <h3><?php esc_html_e('Personal Information', 'frontdev-portfolio'); ?></h3>
          <div class="form-group">
            <label for="firstName"><?php esc_html_e('First Name', 'frontdev-portfolio'); ?> *</label>
            <input type="text" id="firstName" name="firstName" required aria-describedby="firstName-error">
            <div class="error-message" id="firstName-error" role="alert"></div>
          </div>
          <div class="form-group">
            <label for="lastName"><?php esc_html_e('Last Name', 'frontdev-portfolio'); ?> *</label>
            <input type="text" id="lastName" name="lastName" required aria-describedby="lastName-error">
            <div class="error-message" id="lastName-error" role="alert"></div>
          </div>
          <div class="form-group">
            <label for="email"><?php esc_html_e('Email Address', 'frontdev-portfolio'); ?> *</label>
            <input type="email" id="email" name="email" required aria-describedby="email-error">
            <div class="error-message" id="email-error" role="alert"></div>
          </div>
          <div class="form-group">
            <label for="phone"><?php esc_html_e('Phone Number', 'frontdev-portfolio'); ?></label>
            <input type="tel" id="phone" name="phone" aria-describedby="phone-error">
            <div class="error-message" id="phone-error" role="alert"></div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn--secondary btn-next"><?php esc_html_e('Next Step', 'frontdev-portfolio'); ?></button>
          </div>
        </div>

        <!-- Step 2: Project Details -->
        <div class="form-step" data-step="2">
          <h3><?php esc_html_e('Project Details', 'frontdev-portfolio'); ?></h3>
          <div class="form-group">
            <label for="projectType"><?php esc_html_e('Project Type', 'frontdev-portfolio'); ?> *</label>
            <select id="projectType" name="projectType" required aria-describedby="projectType-error">
              <option value=""><?php esc_html_e('Select project type...', 'frontdev-portfolio'); ?></option>
              <option value="website"><?php esc_html_e('Website Development', 'frontdev-portfolio'); ?></option>
              <option value="webapp"><?php esc_html_e('Web Application', 'frontdev-portfolio'); ?></option>
              <option value="ecommerce"><?php esc_html_e('E-commerce Site', 'frontdev-portfolio'); ?></option>
              <option value="portfolio"><?php esc_html_e('Portfolio Site', 'frontdev-portfolio'); ?></option>
              <option value="other"><?php esc_html_e('Other', 'frontdev-portfolio'); ?></option>
            </select>
            <div class="error-message" id="projectType-error" role="alert"></div>
          </div>
          <div class="form-group">
            <label for="budget"><?php esc_html_e('Budget Range', 'frontdev-portfolio'); ?> *</label>
            <select id="budget" name="budget" required aria-describedby="budget-error">
              <option value=""><?php esc_html_e('Select budget range...', 'frontdev-portfolio'); ?></option>
              <option value="under-5k"><?php esc_html_e('Under $5,000', 'frontdev-portfolio'); ?></option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-plus">$25,000+</option>
            </select>
            <div class="error-message" id="budget-error" role="alert"></div>
          </div>
          <div class="form-group">
            <label for="timeline"><?php esc_html_e('Project Timeline', 'frontdev-portfolio'); ?></label>
            <select id="timeline" name="timeline" aria-describedby="timeline-error">
              <option value=""><?php esc_html_e('Select timeline...', 'frontdev-portfolio'); ?></option>
              <option value="urgent"><?php esc_html_e('ASAP (Rush)', 'frontdev-portfolio'); ?></option>
              <option value="1-month"><?php esc_html_e('Within 1 Month', 'frontdev-portfolio'); ?></option>
              <option value="2-3-months"><?php esc_html_e('2-3 Months', 'frontdev-portfolio'); ?></option>
              <option value="flexible"><?php esc_html_e('Flexible', 'frontdev-portfolio'); ?></option>
            </select>
            <div class="error-message" id="timeline-error" role="alert"></div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn--tertiary btn-prev"><?php esc_html_e('Previous', 'frontdev-portfolio'); ?></button>
            <button type="button" class="btn btn--secondary btn-next"><?php esc_html_e('Next Step', 'frontdev-portfolio'); ?></button>
          </div>
        </div>

        <!-- Step 3: Additional Information -->
        <div class="form-step" data-step="3">
          <h3><?php esc_html_e('Additional Information', 'frontdev-portfolio'); ?></h3>
          <div class="form-group">
            <label for="company"><?php esc_html_e('Company Name', 'frontdev-portfolio'); ?></label>
            <input type="text" id="company" name="company" aria-describedby="company-error">
            <div class="error-message" id="company-error" role="alert"></div>
          </div>
          <div class="form-group">
            <label for="message"><?php esc_html_e('Project Description', 'frontdev-portfolio'); ?> *</label>
            <textarea id="message" name="message" rows="5" required aria-describedby="message-error" placeholder="<?php esc_attr_e('Tell me about your project...', 'frontdev-portfolio'); ?>"></textarea>
            <div class="error-message" id="message-error" role="alert"></div>
          </div>
          <div class="form-group">
            <div class="checkbox-group">
              <input type="checkbox" id="newsletter" name="newsletter">
              <label for="newsletter"><?php esc_html_e('Subscribe to newsletter for updates', 'frontdev-portfolio'); ?></label>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn--tertiary btn-prev"><?php esc_html_e('Previous', 'frontdev-portfolio'); ?></button>
            <button type="submit" class="btn btn--primary"><?php esc_html_e('Send Message', 'frontdev-portfolio'); ?></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
