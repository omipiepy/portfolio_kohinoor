import SectionTitle from '@/components/SectionTitle'
import ContactInfo from '@/components/ContactInfo'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="phi-section relative z-10" style={{ background: 'transparent' }}>
      <div className="phi-wrap pointer-events-auto relative z-10">
        <SectionTitle
          title="Get in Touch"
          subtitle="Have a project in mind or just want to chat? I'd love to hear from you."
        />
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-stretch max-w-[1100px] mx-auto">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
