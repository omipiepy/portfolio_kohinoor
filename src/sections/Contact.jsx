import SectionTitle from '@/components/SectionTitle'
import ContactSection from '@/components/ui/contact-01'

export default function Contact() {
  return (
    <section id="contact" className="phi-section relative z-10" style={{ background: 'transparent' }}>
      <div className="phi-wrap pointer-events-auto relative z-10">
        <SectionTitle
          title="Get in Touch"
          subtitle="Have a project in mind or just want to chat? I'd love to hear from you."
        />
        <ContactSection />
      </div>
    </section>
  )
}
