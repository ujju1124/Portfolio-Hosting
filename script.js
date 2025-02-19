// Assuming particlesJS and emailjs are included via script tags in your HTML.  If not, you'll need to include them.  For example:
// <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
// <script src="https://cdn.emailjs.com/sdk/2.6.0/email.min.js"></script>

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle")
    const navLinks = document.getElementById("navLinks")
    const navItems = document.querySelectorAll(".nav-item")
    const skillItems = document.querySelectorAll(".skill-item")
    const contactForm = document.getElementById("contactForm")
  
    // Toggle mobile menu
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  
    // Close mobile menu when a nav item is clicked
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active")
        menuToggle.classList.remove("active")
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Highlight active nav item on scroll
    window.addEventListener("scroll", () => {
      let current = ""
      const sections = document.querySelectorAll("section")
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href").slice(1) === current) {
          item.classList.add("active")
        }
      })
    })
  
    // Initialize particles.js
    particlesJS.load("particles-js", "particles.json", () => {
      console.log("particles.js loaded")
    })
  
    // Animate skill bars on scroll
    // const animateSkillBars = () => {
    //   skillItems.forEach((item) => {
    //     const skillLevel = item.querySelector(".skill-level")
    //     const skillPercentage = item.getAttribute("data-skill-percentage") // Get percentage from data attribute
  
    //     if (isElementInViewport(item)) {
    //       skillLevel.style.width = skillPercentage // Use data attribute value
    //     } else {
    //       skillLevel.style.width = "0%"
    //     }
    //   })
    // }
    
  
    // // Check if element is in viewport
    // function isElementInViewport(el) {
    //   const rect = el.getBoundingClientRect()
    //   return (
    //     rect.top >= 0 &&
    //     rect.left >= 0 &&
    //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    //   )
    // }
  
    // // Initial call to animate skill bars
    // animateSkillBars()
  
    // // Animate skill bars on scroll
    // window.addEventListener("scroll", animateSkillBars)
  
    // Initialize EmailJS
    emailjs.init("HrIAmXGa3dErB1d8t") // EmailJS user ID
  
    // Handle form submission
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
  
      emailjs.sendForm("service_7txwjrv", "template_5i1n3gf", this).then(
        () => {
          console.log("SUCCESS!")
          alert("Message sent successfully!")
          contactForm.reset()
        },
        (error) => {
          console.log("FAILED...", error)
          alert("Failed to send message. Please try again.")
        },
      )
    })
  })
  
  