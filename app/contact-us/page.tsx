import Footer from "@/components/footer"
import Header from "@/components/header"
import FinmatesHeader from "@/components/header2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Linkedin, Instagram, Github, Youtube, Locate, LocateIcon, Landmark, LandmarkIcon, LucideLandmark, MapPin, Phone, Clock, MagnetIcon } from "lucide-react"

export default function ContactPage() {
  return (
    <>
    <MagnetIcon/>
    <FinmatesHeader/>
    <div className="min-h-screen mt-20 bg-white">
      
      {/* Header */}
      <header className="bg-blue-600 text-white py-18">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-semibold text-center">Contact Us</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className=" container mx-auto  py-18">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white border p-10 shadow-2xl rounded-xl ">
            <form className="space-y-6 ">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  Your Name:
                </label>
                <Input id="name" type="text" placeholder="Enter Your Name" className="w-full h-12 lg:text-lg border-gray-300" />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                  Your Email:
                </label>
                <Input id="email" type="email" placeholder="Enter Your Email" className="w-full h-12 border-gray-300 lg:text-lg" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
                  Subject:
                </label>
                <Input id="subject" type="text" placeholder="Enter Your Subject" className="w-full h-12 border-gray-300 lg:text-lg" />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg
                 font-medium text-gray-700 mb-2">
                  Your Message/Question:
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter Your Message"
                  rows={12}
                  className="w-full h-32 border-gray-300 lg:text-lg "
                />
              </div>

              <Button className="w-full h-12 bg-[#003b8d] hover:bg-blue-700 text-lg rounded-tl-xl rounded-br-xl text-white py-3">Submit</Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 mx-auto p-5 ">
            <div className="">
              <h2 className="text-2xl font-semibold text-black mb-4   pb-2">Speak To Us</h2>

              <h3 className="lg:text-[35px] text-3xl font-bold text-gray-800 mb-4">Queries, Feedback, Assistance ?</h3>

              <p className="text-[#001736] mb-4 text-xl">We'll help you with our valuable Conversation.</p>

              <p className="text-[#001736] mb-6 text-xl">
                Fill the form below or Directly Reach Us Now: info@finmates.in
                <br />
                and 09833943776
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 ">
              <div className="flex items-start p-4 rounded-md space-x-3 border">
                <div className="w-10 h-10 mt-7 bg-[#008bd0] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  <MapPin/>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">Address.</h4>
                  <p className="text-base text-[#001736]">
                    
                    Finmate Business Solutions Pvt Ltd. Lmt B-715 Jaswanti Allied
                    <br />
                    Business Center, Ramchandra Lane, Kanchpada Malad W ,
                    <br />
                    Mumbai - 400064.
                    
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-md border space-x-3">
                <div className="w-10 h-10  bg-[#008bd0] rounded-full flex items-center justify-center text-white text-sm font-bold">
                 <Phone size={20}/>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">General Enquiries.</h4>
                  <p className="text-base text-[#001736]">Phone: (+91) 9833943776 Email: enquiry@finmates.in</p>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-md border space-x-3">
                <div className="w-10 h-10 bg-[#008bd0] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  <Clock/>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">Operation Hours.</h4>
                  <p className="text-base text-[#001736]">We're 10:00 AM - 6:00 PM available to help you.</p>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-4">
              <div className="w-10 h-10 bg-[#008bd0] rounded-full flex items-center justify-center text-white hover:bg-blue-700 cursor-pointer">
                <Facebook size={20} />
              </div>
              <div className="w-10 h-10 bg-[#008bd0] rounded-full flex items-center justify-center text-white hover:bg-blue-500 cursor-pointer">
                <Twitter size={20} />
              </div>
              <div className="w-10 h-10 bg-[#008bd0] rounded-full flex items-center justify-center text-white hover:bg-blue-800 cursor-pointer">
                <Linkedin size={20} />
              </div>
              <div className="w-10 h-10 bg-[#008bd0] rounded-full flex items-center justify-center text-white hover:bg-blue-600 cursor-pointer">
                <Instagram size={20} />
              </div>
            </div>
          </div>
        </div>
      </main>

        {/* <section className=" container mx-auto   py-18">
            <div className=" flex justify-around gap-20 items-center">
                <div className="h-ful w-full rounded-md border text-center ">
                    <div className="p-10">
                        <h2 className="text-3xl font-bold">Mumbai</h2>
                        <div className="flex items-start   space-x-3">
                <div className="w-10 h-10  bg-[#008bd0] rounded-full flex items-center justify-center text-white text-sm font-bold">
                 <MapPin size={20}/>
                </div>
                <div>
                  <a className=" text-lg text-gray-800">B-715 Jaswanti Allied Business Center, <br/> Ramchandra Ln, Kanchpada, Malad West,<br/> Mumbai, Maharashtra 400064</a>
                  
                </div>
              </div>
                    </div>
                </div>
                <div className="h-full w-full ">
                <div>
                        <h2>Mumbai</h2>
                        <div className="flex items-start p-4  space-x-3">
                <div className="w-10 h-10  bg-[#008bd0] rounded-full flex items-center justify-center text-white text-sm font-bold">
                 <MapPin size={20}/>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">B-715 Jaswanti Allied Business Center, <br/> Ramchandra Ln, Kanchpada, Malad West,<br/> Mumbai, Maharashtra 400064</h4>
                  
                </div>
              </div>
              <div className="flex items-start p-4  space-x-3">
                <div className="w-10 h-10  bg-[#008bd0] rounded-full flex items-center justify-center text-white text-sm font-bold">
                 <Phone size={20}/>
                </div>
                <div>
                  
                  <p className="text-base text-[#001736]"> (+91) 9833943776</p>
                </div>
              </div>
                    </div>
                </div>
            </div>
        </section> */}

          {/* Office Locations */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Mumbai Office */}
            <div className="text-center bg-white py-10 border rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Mumbai</h2>
              <div className="space-y-6">
                <div className="flex items-start justify-center space-x-3">
                  <MapPin className="text-[#001736] mt-1 flex-shrink-0" size={35} />
                  <div className="text-left">
                    <a
                      href="https://www.google.com/maps/place/FinMate+Business+Solutions+Pvt+Ltd/@19.1897926,72.8395672,15z/data=!4m6!3m5!1s0x3be7b758aa3e3a65:0x59367728835180d8!8m2!3d19.1899435!4d72.8382085!16s%2Fg%2F11j7yhk_vr?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#001736] text-xl hover:underline transition-all duration-200"
                    >
                      B-715 Jaswanti Allied Business Center,
                      <br />
                      Ramchandra Ln, Kanchpada, Malad
                      <br />
                      West, Mumbai, Maharashtra 400064
                    </a>
                  </div>
                </div>
                <div className="flex relative lg:-left-22 items-center justify-center space-x-3">
                  <Phone className="text-[#001736]" size={30} />
                  <span className="text-[#001736] text-xl hover:underline">022 2888 8442</span>
                </div>
              </div>
            </div>

            {/* Indore Office */}
            <div className="text-center bg-white rounded-lg py-10 border">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Indore</h2>
              <div className="space-y-6">
                <div className="flex items-start justify-center space-x-3">
                  <MapPin className="text-[#001736] mt-1 flex-shrink-0" size={35} />
                  <div className="text-left">
                    <a
                      href="https://www.google.com/maps/place/Union+Bank/@22.7097997,75.8741489,17z/data=!3m1!4b1!4m6!3m5!1s0x3962fd2277f3c95b:0x887bd152a7a3a46b!8m2!3d22.7097948!4d75.8767238!16s%2Fg%2F11vhqfb4dq?entry=tts&g_ep=EgoyMDI0MDYxOS4xKgBIAVAD"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#001736] text-xl hover:underline transition-all duration-200"
                    >
                      201 MM Tower, above Union Bank
                      <br />
                      ,Ushanganj, chhawni, Indore
                      <br />
                      452001,Madhya Pradesh
                    </a>
                  </div>
                </div>
                <div className="flex relative -left-18 items-center justify-center space-x-3">
                  <Phone className="text-[#001736]" size={30} />
                  <span className="text-[#001736] text-xl hover:underline">022 2888 8442</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-150 bg-gray-200 relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.6946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwNDEnNDAuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
      </section>

     <Footer/>
    </div>
    </>
  )
}
