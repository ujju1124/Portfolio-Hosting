// Assuming particlesJS and emailjs are included via script tags in your HTML.  If not, you'll need to include them.  For example:
// <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
// <script src="https://cdn.emailjs.com/sdk/2.6.0/email.min.js"></script>

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const navLinks = document.getElementById("navLinks")
  const navItems = document.querySelectorAll(".nav-item")
  const contactForm = document.getElementById("contactForm")
  const projectModal = document.getElementById("projectModal")
  const modalClose = document.getElementById("modalClose")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")
  const moreInfoButtons = document.querySelectorAll(".more-info")

  // Project descriptions for modal
  const projectDetails = {
    project1: {
      title: "Lorem Ipsum Generator",
      description:
        "A quick, customizable tool for designers and developers to generate filler text, enhancing workflow in projects, mockups, and prototypes. This tool allows users to specify the number of paragraphs, words, or characters they need, making it versatile for different design requirements. The generator includes options for starting with 'Lorem ipsum dolor sit amet' or creating completely random text, as well as adjusting the average length of sentences for more natural-looking content.",
    },
    project2: {
      title: "Dynamic Font Converter",
      description:
        "An interactive web app for customizing text with Google Fonts, allowing real-time previews while ensuring font consistency across platforms. Users can experiment with different font families, sizes, weights, and styles before implementing them in their projects. This tool helps designers and developers maintain consistent typography across their websites and applications. The converter also provides CSS code snippets that can be directly copied into projects, saving time and ensuring accurate implementation of the selected fonts.",
    },
    project3: {
      title: "MediSearch Pro",
      description:
        "This web app lets users fetch medicine details by name or image, using Tesseract.js for text extraction and the OpenPDA API for descriptions. It provides comprehensive information about medications, including usage instructions, side effects, and contraindications, making it a valuable resource for healthcare professionals and patients alike. The image recognition feature allows users to simply take a photo of a medicine package or prescription, and the app will identify the medication and provide relevant information, making it accessible even for those who may not know the exact spelling or name of their medication.",
    },
    project4: {
      title: "Simple Analog Clock",
      description:
        "A stylish HTML & CSS clock displaying time elegantly, adding creativity and charm to digital spaces. It smoothly animates the clock hands for a realistic timekeeping experience. The clock features customizable colors and styles, making it adaptable to various website themes and designs. Built with pure CSS animations and JavaScript time functions, this project demonstrates the power of combining these technologies to create interactive, functional, and visually appealing web elements without relying on heavy libraries or frameworks.",
    },
  }

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

    // Add shadow to header on scroll
    const header = document.querySelector(".sticky-header")
    if (window.scrollY > 10) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }
  })

  // Initialize particles.js
  if (typeof particlesJS !== "undefined") {
    window.particlesJS = particlesJS // Make particlesJS globally available
    particlesJS.load("particles-js", "particles.json", () => {
      console.log("particles.js loaded")
    })
  } else {
    console.warn("particlesJS is not defined. Make sure you have included the particles.js library in your HTML.")
  }

  // Handle More Info button clicks
  moreInfoButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const projectId = button.getAttribute("data-project-id")
      const project = projectDetails[projectId]

      if (project) {
        modalTitle.textContent = project.title
        modalDescription.textContent = project.description
        projectModal.classList.add("active")
      }
    })
  })

  // Close modal when clicking the close button
  modalClose.addEventListener("click", () => {
    projectModal.classList.remove("active")
  })

  // Close modal when clicking outside the modal content
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove("active")
    }
  })

  // Close modal when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      projectModal.classList.remove("active")
    }
  })

  // Add parallax effect to About Me image
  const aboutImageContainer = document.querySelector(".about-image-container")
  const aboutImage = document.querySelector(".about-image")

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset
    const containerRect = aboutImageContainer.getBoundingClientRect()
    const containerTop = containerRect.top + scrollPosition
    const containerBottom = containerRect.bottom + scrollPosition

    if (scrollPosition > containerTop && scrollPosition < containerBottom) {
      const parallaxValue = (scrollPosition - containerTop) * 0.5
      aboutImage.style.transform = `translateY(-${parallaxValue}px) scale(1.1)`
    }
  })

  // Initialize EmailJS
  if (typeof emailjs !== "undefined") {
    window.emailjs = emailjs // Make emailjs globally available
    emailjs.init("HrIAmXGa3dErB1d8t") // EmailJS user ID

    // Handle form submission
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i> Sending...'
      submitButton.disabled = true

      emailjs.sendForm("service_7txwjrv", "template_5i1n3gf", this).then(
        () => {
          console.log("SUCCESS!")
          submitButton.innerHTML = '<i class="fas fa-check" style="margin-right: 0.5rem;"></i> Message Sent!';
          setTimeout(() => {
            submitButton.innerHTML = originalText
            submitButton.disabled = false
            contactForm.reset()
          }, 3000)
        },
        (error) => {
          console.log("FAILED...", error)
          submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send'
          setTimeout(() => {
            submitButton.innerHTML = originalText
            submitButton.disabled = false
          }, 3000)
        },
      )
    })
  } else {
    console.warn("emailjs is not defined. Make sure you have included the EmailJS library in your HTML.")
  }
})

