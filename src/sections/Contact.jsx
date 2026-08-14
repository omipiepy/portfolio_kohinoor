import SectionTitle from '@/components/SectionTitle'
import ContactInfo from '@/components/ContactInfo'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="phi-section relative">
      <div className="phi-wrap pointer-events-auto">
        <SectionTitle
          title="Get in Touch"
        />
        <div className="grid md:grid-cols-[38.2fr_61.8fr] gap-[34px] lg:gap-[55px] items-stretch max-w-[1280px] mx-auto my-[13px]">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
