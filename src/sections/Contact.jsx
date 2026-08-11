import SectionTitle from '@/components/SectionTitle'
import ContactInfo from '@/components/ContactInfo'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="phi-section relative">
      <div className="phi-wrap pointer-events-auto">
        <SectionTitle
          kicker="contact"
          title="Get in Touch"
          subtitle="Have a project in mind, a question, or just want to say hello? My inbox is always open."
        />
        <div className="grid md:grid-cols-[38.2fr_61.8fr] gap-[21px] lg:gap-[34px] items-stretch max-w-[1280px] mx-auto">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
