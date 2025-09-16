const dot = document.querySelector(".active-dot")
const buttons = document.querySelectorAll(".page-links button")
const container = document.querySelector(".cont")
const tagButtons = document.querySelectorAll(".tags button")
const workItems = document.querySelectorAll(".work-thumb img")
const workPopup = document.getElementById("workPopup")
const popupClose = document.getElementById("popupClose")
const popupOverlay = document.querySelector(".popup-overlay")
const popupImage = document.getElementById("popupImage")
const popupTitle = document.getElementById("popupTitle")
const popupDescription = document.getElementById("popupDescription")
const popupTags = document.getElementById("popupTags")
const contactPopup = document.getElementById("contactPopup")
const contactPopupClose = document.getElementById("contactPopupClose")
const contactButton = document.querySelector(".contact-link")
const companyBlocks = document.querySelectorAll(".company-block")
const companyPopup = document.getElementById("companyPopup")
const companyPopupClose = document.getElementById("companyPopupClose")
const companyLogo = document.getElementById("companyLogo")
const companyName = document.getElementById("companyName")
const companyPosition = document.getElementById("companyPosition")
const companyDuration = document.getElementById("companyDuration")
const companyDesc = document.getElementById("companyDesc")

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the top position of the clicked button relative to its container
    const offsetTop = button.offsetTop + button.offsetHeight / 2 - 4 // center dot vertically (4 = dot radius)

    dot.style.top = `${offsetTop}px`

    // Handle active class swap
    buttons.forEach((btn) => btn.classList.remove("btn-active"))
    button.classList.add("btn-active")

    const buttonClass = button.className

    // Remove all view classes first for smooth transitions
    container.classList.remove("work-view", "about-view")

    // Add appropriate view class based on clicked button
    if (buttonClass.includes("work-link")) {
      container.classList.add("work-view")
    } else if (buttonClass.includes("about-link")) {
      container.classList.add("about-view")
    } else if (buttonClass.includes("contact-link")) {
      contactPopup.classList.add("active")
      document.body.style.overflow = "hidden"
    }
    // Home button removes all view classes, returning to default split view
  })
})

const activeTags = new Set(["all"])

tagButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter")

    if (filter === "all") {
      // Clear all other tags when "All" is clicked
      activeTags.clear()
      activeTags.add("all")

      tagButtons.forEach((btn) => {
        btn.classList.remove("tag-checked")
        btn.classList.add("tag-unchecked")
      })
      button.classList.remove("tag-unchecked")
      button.classList.add("tag-checked")
    } else {
      // Remove "All" if another tag is clicked
      activeTags.delete("all")
      document.querySelector('[data-filter="all"]').classList.remove("tag-checked")
      document.querySelector('[data-filter="all"]').classList.add("tag-unchecked")

      // Toggle the clicked tag
      if (activeTags.has(filter)) {
        activeTags.delete(filter)
        button.classList.remove("tag-checked")
        button.classList.add("tag-unchecked")
      } else {
        activeTags.add(filter)
        button.classList.remove("tag-unchecked")
        button.classList.add("tag-checked")
      }

      // If no tags are active, activate "All"
      if (activeTags.size === 0) {
        activeTags.add("all")
        document.querySelector('[data-filter="all"]').classList.remove("tag-unchecked")
        document.querySelector('[data-filter="all"]').classList.add("tag-checked")
      }
    }

    // Reorder tags - move active ones to front
    const tagsContainer = document.querySelector(".tags")
    const allButtons = Array.from(tagButtons)

    // Sort buttons: active first, then inactive
    allButtons.sort((a, b) => {
      const aFilter = a.getAttribute("data-filter")
      const bFilter = b.getAttribute("data-filter")
      const aActive = activeTags.has(aFilter)
      const bActive = activeTags.has(bFilter)

      if (aActive && !bActive) return -1
      if (!aActive && bActive) return 1
      return 0
    })

    // Reappend in new order
    allButtons.forEach((btn) => tagsContainer.appendChild(btn))

    // Filter work items
    workItems.forEach((item) => {
      const categories = item.getAttribute("data-category").split(" ")

      if (activeTags.has("all") || categories.some((cat) => activeTags.has(cat))) {
        item.classList.remove("hidden")
      } else {
        item.classList.add("hidden")
      }
    })
  })
})

workItems.forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.getAttribute("data-title")
    const description = item.getAttribute("data-description")
    const categories = item.getAttribute("data-category").split(" ")
    const imageSrc = item.src

    // Update popup content
    popupImage.src = imageSrc
    popupTitle.textContent = title
    popupDescription.textContent = description

    // Clear and add tags
    popupTags.innerHTML = ""
    categories.forEach((category) => {
      const tag = document.createElement("span")
      tag.className = "popup-tag bricolage-reg"
      tag.textContent = category.replace("-", " ")
      popupTags.appendChild(tag)
    })

    // Show popup
    workPopup.classList.add("active")
    document.body.style.overflow = "hidden"
  })
})

companyBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    const company = block.getAttribute("data-company")
    const position = block.getAttribute("data-position")
    const duration = block.getAttribute("data-duration")
    const description = block.getAttribute("data-description")
    const logoSrc = block.querySelector("img").src

    // Update popup content
    companyLogo.src = logoSrc
    companyName.textContent = company
    companyPosition.textContent = position
    companyDuration.textContent = duration
    companyDesc.textContent = description

    // Show popup
    companyPopup.classList.add("active")
    document.body.style.overflow = "hidden"
  })
})

function closePopup() {
  workPopup.classList.remove("active")
  document.body.style.overflow = "auto"
}

function closeContactPopup() {
  contactPopup.classList.remove("active")
  document.body.style.overflow = "auto"
}

function closeCompanyPopup() {
  companyPopup.classList.remove("active")
  document.body.style.overflow = "auto"
}

popupClose.addEventListener("click", closePopup)
popupOverlay.addEventListener("click", closePopup)

contactPopupClose.addEventListener("click", closeContactPopup)
contactPopup.querySelector(".popup-overlay").addEventListener("click", closeContactPopup)

companyPopupClose.addEventListener("click", closeCompanyPopup)
companyPopup.querySelector(".popup-overlay").addEventListener("click", closeCompanyPopup)

// Close popup with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (workPopup.classList.contains("active")) {
      closePopup()
    }
    if (contactPopup.classList.contains("active")) {
      closeContactPopup()
    }
    if (companyPopup.classList.contains("active")) {
      closeCompanyPopup()
    }
  }
})

window.addEventListener("DOMContentLoaded", () => {
  const active = document.querySelector(".btn-active")
  const offsetTop = active.offsetTop + active.offsetHeight / 2 - 4
  dot.style.top = `${offsetTop}px`
})
