import ContactInfo from '@/components/ui/contact-01-utils/contact-info'
import ContactForm from '@/components/ui/contact-01-utils/contact-form'

const ContactSection = () => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 items-stretch">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactSection
