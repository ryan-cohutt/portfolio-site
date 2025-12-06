const dot = document.querySelector(".active-dot")
const buttons = document.querySelectorAll(".page-links button")
const container = document.querySelector(".cont")
const tagButtons = document.querySelectorAll(".tags button")
const workPopup = document.getElementById("workPopup")
const popupClose = document.getElementById("popupClose")
const popupOverlay = workPopup.querySelector(".popup-overlay")
const popupProjectsContainer = workPopup.querySelector(".popup-projects-container")
const workItems = document.querySelectorAll(".work-thumb img")
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

const isDragging = false
const startY = 0
const startPosition = "home" // Can be 'home', 'work', or 'about'
let currentState = "home" // Track current state for snapping

const sectHr = document.querySelector(".sect-hr")

/* Removed drag event listeners for mobile tabs */
// sectHr.addEventListener("mousedown", startDrag)
// sectHr.addEventListener("touchstart", startDrag, { passive: false })

// document.addEventListener("mousemove", dragDivider)
// document.addEventListener("touchmove", dragDivider, { passive: false })

// function dragDivider(e) {
//   if (!isDragging) return

//   if (e.type.includes("touch")) {
//     e.preventDefault()
//   }

//   const currentY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY
//   const deltaY = currentY - startY

//   // Calculate new position (0 = top/work, middle = 50/50, bottom = about)
//   const container = document.querySelector(".cont")
//   const containerRect = container.getBoundingClientRect()
//   const dividerY = sectHr.getBoundingClientRect().top - containerRect.top

//   // Just update visual feedback during drag (optional)
//   sectHr.style.opacity = "0.7"
// }

// document.addEventListener("mouseup", endDrag)
// document.addEventListener("touchend", endDrag, { passive: false })

// function endDrag(e) {
//   if (!isDragging) return
//   isDragging = false

//   const endY = e.type.includes("touch") ? e.changedTouches[0].clientY : e.clientY
//   const deltaY = endY - startY

//   const viewportHeight = window.innerHeight
//   const thresholdPercent = 0.15 // reduced from 0.3 (30%) to 0.15 (15%) for more responsive dragging

//   // Determine snap target based on drag distance and direction
//   let snapTarget = startPosition
//   const dragThreshold = viewportHeight * thresholdPercent

//   if (startPosition === "home") {
//     // From home, dragging up goes to work, down goes to about
//     if (deltaY < -dragThreshold) {
//       snapTarget = "work"
//     } else if (deltaY > dragThreshold) {
//       snapTarget = "about"
//     }
//   } else if (startPosition === "work") {
//     // From work, dragging down returns to home
//     if (deltaY > dragThreshold) {
//       snapTarget = "home"
//     }
//   } else if (startPosition === "about") {
//     // From about, dragging up returns to home
//     if (deltaY < -dragThreshold) {
//       snapTarget = "home"
//     }
//   }

//   // Apply the snap state
//   container.classList.remove("work-view", "about-view")

//   if (snapTarget === "work") {
//     container.classList.add("work-view")
//     currentState = "work"
//   } else if (snapTarget === "about") {
//     container.classList.add("about-view")
//     currentState = "about"
//   } else {
//     currentState = "home"
//   }

//   // Update nav button active state
//   const buttons = document.querySelectorAll(".page-links button")
//   buttons.forEach((btn) => btn.classList.remove("btn-active"))

//   if (snapTarget === "work") {
//     document.querySelector(".work-link").classList.add("btn-active")
//   } else if (snapTarget === "about") {
//     document.querySelector(".about-link").classList.add("btn-active")
//   } else {
//     document.querySelector(".home-link").classList.add("btn-active")
//   }

//   sectHr.style.opacity = "1"
//   sectHr.style.cursor = "grab"
//   document.body.style.userSelect = "auto"
// }

const images = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');

// Open lightbox
images.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxBlur.style.background = `transparent`;
    lightbox.classList.remove('hidden');
  });
});

// Close button
closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  lightboxImg.src = "";
  lightboxBlur.style.background = "transparent";
});

// Close by clicking outside the image
lightboxBlur.addEventListener('click', (e) => {
  if (e.target === lightboxBlur) {
    lightbox.classList.add('hidden');
    lightboxImg.src = "";
    lightboxBlur.style.background = "transparent";
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Position the dot relative to the page-links container
    const pageLinks = button.closest(".page-links")
    const pageLinksRect = pageLinks.getBoundingClientRect()
    const btnRect = button.getBoundingClientRect()
    // compute top position of dot relative to pageLinks (center of button)
    const offsetTop = btnRect.top - pageLinksRect.top + btnRect.height / 2 - 4 // 4 = dot radius

    dot.style.top = `${offsetTop}px`

    // Handle active class swap
    buttons.forEach((btn) => btn.classList.remove("btn-active"))
    button.classList.add("btn-active")

    // Clear both view classes then set the desired one
    container.classList.remove("work-view", "about-view")

    if (button.classList.contains("work-link")) {
      container.classList.add("work-view")
      currentState = "work"
    } else if (button.classList.contains("about-link")) {
      container.classList.add("about-view")
      currentState = "about"
    } else if (button.classList.contains("contact-link")) {
      // open contact popup (preserve your existing contact popup logic)
      contactPopup.classList.add("active")
      document.body.style.overflow = "hidden"
    }
    // Home button just leaves container with no view classes (50/50)
  })
})

// position dot when page loads (robust)
window.addEventListener("DOMContentLoaded", () => {
  const active = document.querySelector(".btn-active")
  if (active) {
    const pageLinks = active.closest(".page-links")
    const pageLinksRect = pageLinks.getBoundingClientRect()
    const btnRect = active.getBoundingClientRect()
    const offsetTop = btnRect.top - pageLinksRect.top + btnRect.height / 2 - 4
    dot.style.top = `${offsetTop}px`
  }
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

    // Filter work items: add .inactive to items that don't match, remove it for matches
    workItems.forEach((item) => {
      const categories = item.getAttribute("data-category").split(" ")

      if (activeTags.has("all") || categories.some((cat) => activeTags.has(cat))) {
        item.classList.remove("inactive")
      } else {
        item.classList.add("inactive")
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

// Hide all projects initially inside the popup
function hideAllProjects() {
  const projects = popupProjectsContainer.querySelectorAll(".popup-project")
  projects.forEach((proj) => {
    proj.style.display = "none"
  })
}

// Show specific project by id inside the popup
function showProject(projectId) {
  hideAllProjects()
  const project = document.getElementById(projectId)
  if (project) {
    project.style.display = "grid" // use flex to show content with flex layout
  }
}

// Update URL hash without scrolling
function updateURLHash(projectId) {
  if (history.pushState) {
    // Use pushState to avoid scrolling to element with that ID
    history.pushState(null, null, `#${projectId}`)
  } else {
    // Fallback for older browsers
    location.hash = `#${projectId}`
  }
}

// Clear URL hash when popup closes
function clearURLHash() {
  if (history.pushState) {
    history.pushState("", document.title, window.location.pathname + window.location.search)
  } else {
    location.hash = ""
  }
}

// Open popup with specific project content
function openPopup(projectId) {
  showProject(projectId)
  workPopup.classList.add("active")
  document.body.style.overflow = "hidden"
  updateURLHash(projectId)
}

// Close popup and reset states
function closePopup() {
  workPopup.classList.remove("active")
  document.body.style.overflow = "auto"
  hideAllProjects()
  clearURLHash()
}

// Attach click event on each work item (thumbnail)
workItems.forEach((item, index) => {
  // Assuming each work item has a data attribute with project id to match popup project div id
  // e.g. data-project-id="project-1"
  item.addEventListener("click", () => {
    const projectId = item.getAttribute("data-project-id")
    if (projectId) {
      openPopup(projectId)
    }
  })
})

// Close popup on clicking close button or overlay
popupClose.addEventListener("click", closePopup)
popupOverlay.addEventListener("click", closePopup)

// Close popup on Escape key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (workPopup.classList.contains("active")) {
      closePopup()
    }
  }
})

// Initially hide all projects inside popup so nothing shows before open
hideAllProjects()

function closeContactPopup() {
  contactPopup.classList.remove("active")
  document.body.style.overflow = "auto"
}

function closeCompanyPopup() {
  companyPopup.classList.remove("active")
  document.body.style.overflow = "auto"
}

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

window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.substring(1) // Remove the #
  if (hash) {
    const project = document.getElementById(hash)
    if (project) {
      openPopup(hash)
    }
  }
})

/* Updated mobile tab navigation to use new .mobile-nav-bar */
const mobileTabButtons = document.querySelectorAll(".mobile-tab-btn")

mobileTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const viewType = button.getAttribute("data-view")

    // Update active button state
    mobileTabButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Update container view
    container.classList.remove("work-view", "about-view")

    if (viewType === "work") {
      container.classList.add("work-view")
      currentState = "work"
    } else if (viewType === "about") {
      container.classList.add("about-view")
      currentState = "about"
    } else {
      currentState = "home"
    }

    // Update desktop navigation if visible
    buttons.forEach((btn) => btn.classList.remove("btn-active"))
    if (viewType === "work") {
      document.querySelector(".work-link").classList.add("btn-active")
    } else if (viewType === "about") {
      document.querySelector(".about-link").classList.add("btn-active")
    } else {
      document.querySelector(".home-link").classList.add("btn-active")
    }
  })
})

/* Initialize mobile tabs on load */
window.addEventListener("DOMContentLoaded", () => {
  const homeTabBtn = document.querySelector('[data-view="home"]')
  if (homeTabBtn) {
    homeTabBtn.classList.add("active")
  }
})
