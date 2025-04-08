document.addEventListener("DOMContentLoaded", () => {
    // Sample product data
    const products = [
      {
        id: 1,
        title: "Oversized Graphic Tee",
        category: "clothing",
        price: 29.99,
        oldPrice: 39.99,
        rating: 4.5,
        ratingCount: 128,
        image: "/placeholder.svg?height=400&width=300",
        colors: ["black", "white", "blue"],
        sizes: ["S", "M", "L", "XL"],
        badge: "New",
        tags: ["aesthetic", "vintage"],
        description:
          "This oversized graphic tee is perfect for that effortlessly cool vibe. Made from 100% organic cotton for maximum comfort.",
      },
      {
        id: 2,
        title: "Y2K Mini Skirt",
        category: "clothing",
        price: 34.99,
        oldPrice: null,
        rating: 4.8,
        ratingCount: 96,
        image: "/placeholder.svg?height=400&width=300",
        colors: ["pink", "black", "blue"],
        sizes: ["XS", "S", "M", "L"],
        badge: "Trending",
        tags: ["y2k", "aesthetic"],
        description:
          "Channel your inner 2000s icon with this Y2K-inspired mini skirt. Features a high waist and pleated design.",
      },
      {
        id: 3,
        title: "Chunky Platform Boots",
        category: "footwear",
        price: 79.99,
        oldPrice: 99.99,
        rating: 4.6,
        ratingCount: 74,
        image: "/placeholder.svg?height=400&width=300",
        colors: ["black", "white"],
        sizes: ["36", "37", "38", "39", "40", "41"],
        badge: "Sale",
        tags: ["grunge", "alternative"],
        description:
          "These chunky platform boots will elevate any outfit (literally). Perfect for adding an edgy touch to your look.",
      },
      {
        id: 4,
        title: "Vintage Inspired Sunglasses",
        category: "accessories",
        price: 24.99,
        oldPrice: null,
        rating: 4.3,
        ratingCount: 52,
        image: "/placeholder.svg?height=400&width=300",
        colors: ["black", "brown", "green"],
        sizes: ["One Size"],
        badge: null,
        tags: ["vintage", "minimal"],
        description:
          "These vintage-inspired sunglasses add the perfect retro touch to any outfit. UV protection included.",
      },
      {
        id: 5,
        title: "Minimalist Gold Necklace",
        category: "accessories",
        price: 19.99,
        oldPrice: 29.99,
        rating: 4.7,
        ratingCount: 63,
        image: "/placeholder.svg?height=400&width=300",
        colors: ["gold"],
        sizes: ["One Size"],
        badge: null,
        tags: ["minimal"],
        description:
          "A delicate gold-plated necklace that adds a subtle touch of elegance to any outfit. Perfect for layering.",
      },
      {
        id: 6,
        title: "Baggy Cargo Pants",
        category: "clothing",
        price: 49.99,
        oldPrice: null,
        rating: 4.4,
        ratingCount: 87,
        image: "/placeholder.svg?height=400&width=300",
        colors: ["green", "black", "beige"],
        sizes: ["S", "M", "L", "XL"],
        badge: "Hot",
        tags: ["streetwear", "y2k"],
        description:
          "These baggy cargo pants are both stylish and practical with multiple pockets. A streetwear essential.",
      },
      {
        id: 7,
        title: "Glow Serum",
        category: "beauty",
        price: 24.99,
        oldPrice: 34.99,
        rating: 4.9,
        ratingCount: 112,
        image: "/placeholder.svg?height=400&width=300",
        colors: [],
        sizes: ["30ml", "50ml"],
        badge: "Best Seller",
        tags: ["aesthetic", "minimal"],
        description: "Achieve that perfect dewy glow with this hydrating serum. Made with clean, vegan ingredients.",
      },
      {
        id: 8,
        title: "Chunky Knit Sweater",
        category: "clothing",
        price: 59.99,
        oldPrice: 79.99,
        rating: 4.5,
        ratingCount: 68,
        image: "/placeholder.svg?height=400&width=300",
        colors: ["white", "pink", "blue"],
        sizes: ["S", "M", "L", "XL"],
        badge: "Sale",
        tags: ["aesthetic", "minimal"],
        description: "Stay cozy and stylish in this oversized chunky knit sweater. Perfect for those chilly days.",
      },
    ]
  
    // DOM Elements
    const productsContainer = document.getElementById("products-container")
    const cartItems = document.getElementById("cart-items")
    const wishlistItems = document.getElementById("wishlist-items")
    const emptyCart = document.getElementById("empty-cart")
    const cartFooter = document.getElementById("cart-footer")
    const emptyWishlist = document.getElementById("empty-wishlist")
    const cartCount = document.getElementById("cart-count")
    const wishlistCount = document.getElementById("wishlist-count")
    const cartTotalAmount = document.getElementById("cart-total-amount")
    const searchInput = document.getElementById("search-input")
    const searchResults = document.getElementById("search-results")
    const notification = document.getElementById("notification")
    const loyaltyBadge = document.getElementById("loyalty-badge")
    const quickViewModal = document.getElementById("quick-view-modal")
    const quickViewProduct = document.getElementById("quick-view-product")
    const discountPopup = document.getElementById("discount-popup")
    const overlay = document.getElementById("overlay")
  
    // Cart and Wishlist Arrays
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  
    // Initialize
    function init() {
      renderProducts(products)
      updateCartCount()
      updateWishlistCount()
      checkCartEmpty()
      checkWishlistEmpty()
      updateCartTotal()
      setupEventListeners()
  
      // Show discount popup after 5 seconds
      setTimeout(() => {
        if (!localStorage.getItem("discountShown")) {
          showDiscountPopup()
        }
      }, 5000)
  
      // Check if user is VIP (has made 3+ purchases)
      const purchaseCount = localStorage.getItem("purchaseCount") || 0
      if (purchaseCount >= 3 && !localStorage.getItem("vipShown")) {
        showLoyaltyBadge()
        localStorage.setItem("vipShown", "true")
      }
    }
  
    // Render Products
    function renderProducts(productsToRender) {
      productsContainer.innerHTML = ""
  
      productsToRender.forEach((product) => {
        const productCard = document.createElement("div")
        productCard.classList.add("product-card")
        productCard.dataset.id = product.id
        productCard.dataset.category = product.category
  
        // Add tags as dataset attributes
        if (product.tags) {
          product.tags.forEach((tag) => {
            productCard.dataset[tag] = true
          })
        }
  
        const oldPriceHtml = product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ""
  
        const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : ""
  
        // Generate rating stars
        const stars = generateStars(product.rating)
  
        productCard.innerHTML = `
                  <div class="product-image">
                      <img src="${product.image}" alt="${product.title}">
                      ${badgeHtml}
                      <div class="product-actions">
                          <button class="product-action-btn quick-view-btn" data-id="${product.id}">
                              <i class="fas fa-eye"></i>
                          </button>
                          <button class="product-action-btn wishlist-toggle-btn" data-id="${product.id}">
                              <i class="fas fa-heart"></i>
                          </button>
                          <button class="product-action-btn" data-id="${product.id}">
                              <i class="fas fa-share"></i>
                          </button>
                      </div>
                  </div>
                  <div class="product-info">
                      <div class="product-category">${product.category}</div>
                      <h3 class="product-title">${product.title}</h3>
                      <div class="product-price">
                          <span class="current-price">$${product.price.toFixed(2)}</span>
                          ${oldPriceHtml}
                      </div>
                      <div class="product-rating">
                          <div class="rating-stars">${stars}</div>
                          <span class="rating-count">(${product.ratingCount})</span>
                      </div>
                      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                  </div>
              `
  
        productsContainer.appendChild(productCard)
      })
    }
  
    // Generate Rating Stars
    function generateStars(rating) {
      let stars = ""
      const fullStars = Math.floor(rating)
      const halfStar = rating % 1 >= 0.5
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  
      for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>'
      }
  
      if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>'
      }
  
      for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>'
      }
  
      return stars
    }
  
    // Setup Event Listeners
    function setupEventListeners() {
      // Mobile Menu Toggle
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
      const mobileMenu = document.querySelector(".mobile-menu")
      const closeMenuBtn = document.querySelector(".close-menu-btn")
  
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active")
        overlay.classList.add("active")
        document.body.style.overflow = "hidden"
      })
  
      closeMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = ""
      })
  
      // Theme Toggle
      const themeToggle = document.getElementById("theme-toggle")
      const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
  
      themeToggle.addEventListener("click", toggleTheme)
      mobileThemeToggle.addEventListener("change", toggleTheme)
  
      // Cart Toggle
      const cartBtn = document.getElementById("cart-btn")
      const mobileCartBtn = document.getElementById("mobile-cart-btn")
      const cartSidebar = document.getElementById("cart-sidebar")
      const closeCartBtn = document.getElementById("close-cart-btn")
  
      cartBtn.addEventListener("click", () => {
        cartSidebar.classList.add("active")
        overlay.classList.add("active")
        document.body.style.overflow = "hidden"
      })
  
      mobileCartBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        cartSidebar.classList.add("active")
        overlay.classList.add("active")
        document.body.style.overflow = "hidden"
      })
  
      closeCartBtn.addEventListener("click", () => {
        cartSidebar.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = ""
      })
  
      // Wishlist Toggle
      const wishlistBtn = document.getElementById("wishlist-btn")
      const mobileWishlistBtn = document.getElementById("mobile-wishlist-btn")
      const wishlistSidebar = document.getElementById("wishlist-sidebar")
      const closeWishlistBtn = document.getElementById("close-wishlist-btn")
  
      wishlistBtn.addEventListener("click", () => {
        wishlistSidebar.classList.add("active")
        overlay.classList.add("active")
        document.body.style.overflow = "hidden"
      })
  
      mobileWishlistBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        wishlistSidebar.classList.add("active")
        overlay.classList.add("active")
        document.body.style.overflow = "hidden"
      })
  
      closeWishlistBtn.addEventListener("click", () => {
        wishlistSidebar.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = ""
      })
  
      // Overlay Click
      overlay.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        cartSidebar.classList.remove("active")
        wishlistSidebar.classList.remove("active")
        quickViewModal.classList.remove("active")
        discountPopup.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = ""
      })
  
      // Add to Cart Buttons
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart-btn") || e.target.closest(".add-to-cart-btn")) {
          const btn = e.target.classList.contains("add-to-cart-btn") ? e.target : e.target.closest(".add-to-cart-btn")
          const productId = Number.parseInt(btn.dataset.id)
          addToCart(productId)
        }
      })
  
      // Quick View Buttons
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("quick-view-btn") || e.target.closest(".quick-view-btn")) {
          const btn = e.target.classList.contains("quick-view-btn") ? e.target : e.target.closest(".quick-view-btn")
          const productId = Number.parseInt(btn.dataset.id)
          openQuickView(productId)
        }
      })
  
      // Close Quick View Modal
      const closeModalBtn = document.getElementById("close-modal-btn")
      closeModalBtn.addEventListener("click", () => {
        quickViewModal.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = ""
      })
  
      // Wishlist Toggle Buttons
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("wishlist-toggle-btn") || e.target.closest(".wishlist-toggle-btn")) {
          const btn = e.target.classList.contains("wishlist-toggle-btn")
            ? e.target
            : e.target.closest(".wishlist-toggle-btn")
          const productId = Number.parseInt(btn.dataset.id)
          toggleWishlist(productId)
        }
      })
  
      // Filter Buttons
      const filterBtns = document.querySelectorAll(".filter-btn")
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const filter = this.dataset.filter
  
          // Remove active class from all buttons in the same group
          const filterGroup = this.closest(".filter-group")
          filterGroup.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.classList.remove("active")
          })
  
          // Add active class to clicked button
          this.classList.add("active")
  
          // Filter products
          filterProducts()
        })
      })
  
      // Filter Options
      const filterOptions = document.querySelectorAll(".filter-option")
      filterOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const filterType = this.dataset.price ? "price" : this.dataset.color ? "color" : this.dataset.sort ? "sort" : ""
  
          // Remove active class from all options in the same dropdown
          const filterDropdown = this.closest(".filter-dropdown-content")
          filterDropdown.querySelectorAll(".filter-option").forEach((opt) => {
            opt.classList.remove("active")
          })
  
          // Add active class to clicked option
          this.classList.add("active")
  
          // Update dropdown button text
          const dropdownBtn = filterDropdown.previousElementSibling
          dropdownBtn.innerHTML = this.textContent + ' <i class="fas fa-chevron-down"></i>'
  
          // Filter products
          filterProducts()
        })
      })
  
      // Load More Button
      const loadMoreBtn = document.getElementById("load-more-btn")
      loadMoreBtn.addEventListener("click", () => {
        // In a real app, this would load more products from the server
        showNotification("All products loaded!", "success")
      })
  
      // Start Shopping Button
      const startShoppingBtn = document.getElementById("start-shopping-btn")
      startShoppingBtn.addEventListener("click", () => {
        cartSidebar.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = ""
  
        // Scroll to shop section
        document.getElementById("shop").scrollIntoView({ behavior: "smooth" })
      })
  
      // Explore Products Button
      const exploreProductsBtn = document.getElementById("explore-products-btn")
      exploreProductsBtn.addEventListener("click", () => {
        wishlistSidebar.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = ""
  
        // Scroll to shop section
        document.getElementById("shop").scrollIntoView({ behavior: "smooth" })
      })
  
      // Search Input
      searchInput.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase()
  
        if (query.length > 0) {
          const results = products.filter(
            (product) => product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query),
          )
  
          showSearchResults(results)
        } else {
          searchResults.classList.remove("active")
        }
      })
  
      searchInput.addEventListener("focus", function () {
        if (this.value.trim().length > 0) {
          searchResults.classList.add("active")
        }
      })
  
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) {
          searchResults.classList.remove("active")
        }
      })
  
      // Discount Wheel
      const spinBtn = document.getElementById("spin-btn")
      const discountWheel = document.getElementById("discount-wheel")
      const closePopupBtn = document.getElementById("close-popup-btn")
  
      spinBtn.addEventListener("click", function () {
        this.disabled = true
  
        // Random rotation between 1080 and 1800 degrees (3-5 full rotations)
        const rotation = 1080 + Math.floor(Math.random() * 720)
  
        discountWheel.style.transform = `rotate(${rotation}deg)`
  
        setTimeout(() => {
          // Calculate which section landed on the pointer
          const normalizedRotation = rotation % 360
          const sectionSize = 360 / 6 // 6 sections
          const sectionIndex = Math.floor((360 - normalizedRotation) / sectionSize)
  
          const discountSection = discountWheel.children[sectionIndex % 6]
          const discount = discountSection.dataset.discount
  
          let discountText
          if (discount === "free") {
            discountText = "FREE SHIPPING"
          } else {
            discountText = `${discount}% OFF`
          }
  
          // Save discount to localStorage
          localStorage.setItem("discount", discount)
          localStorage.setItem("discountShown", "true")
  
          // Show notification
          showNotification(`🎉 You won ${discountText}! Applied to your next order.`, "success")
  
          // Close popup after 2 seconds
          setTimeout(() => {
            discountPopup.classList.remove("active")
            overlay.classList.remove("active")
          }, 2000)
        }, 3000)
      })
  
      closePopupBtn.addEventListener("click", () => {
        discountPopup.classList.remove("active")
        overlay.classList.remove("active")
        localStorage.setItem("discountShown", "true")
      })
  
      // Newsletter Form
      const newsletterForm = document.querySelector(".newsletter-form")
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const email = this.querySelector('input[type="email"]').value
  
        if (email) {
          showNotification("Thanks for subscribing! Check your email for a special discount. ✉️", "success")
          this.reset()
        }
      })
    }
  
    // Filter Products
    function filterProducts() {
      let filteredProducts = [...products]
  
      // Category filter
      const categoryFilter = document.querySelector(".filter-btn.active[data-filter]")
      if (categoryFilter && categoryFilter.dataset.filter !== "all") {
        filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter.dataset.filter)
      }
  
      // Tag filter
      const tagFilter = document.querySelector(".tag-filter.active[data-tag]")
      if (tagFilter) {
        const tag = tagFilter.dataset.tag
        filteredProducts = filteredProducts.filter((product) => product.tags && product.tags.includes(tag))
      }
  
      // Price filter
      const priceFilter = document.querySelector(".filter-option.active[data-price]")
      if (priceFilter && priceFilter.dataset.price !== "all") {
        const priceRange = priceFilter.dataset.price
  
        if (priceRange === "0-25") {
          filteredProducts = filteredProducts.filter((product) => product.price <= 25)
        } else if (priceRange === "25-50") {
          filteredProducts = filteredProducts.filter((product) => product.price > 25 && product.price <= 50)
        } else if (priceRange === "50-100") {
          filteredProducts = filteredProducts.filter((product) => product.price > 50 && product.price <= 100)
        } else if (priceRange === "100+") {
          filteredProducts = filteredProducts.filter((product) => product.price > 100)
        }
      }
  
      // Color filter
      const colorFilter = document.querySelector(".filter-option.active[data-color]")
      if (colorFilter && colorFilter.dataset.color !== "all") {
        const color = colorFilter.dataset.color
        filteredProducts = filteredProducts.filter((product) => product.colors && product.colors.includes(color))
      }
  
      // Sort
      const sortFilter = document.querySelector(".filter-option.active[data-sort]")
      if (sortFilter) {
        const sortType = sortFilter.dataset.sort
  
        if (sortType === "price-low") {
          filteredProducts.sort((a, b) => a.price - b.price)
        } else if (sortType === "price-high") {
          filteredProducts.sort((a, b) => b.price - a.price)
        } else if (sortType === "newest") {
          // In a real app, you would sort by date
          filteredProducts.reverse()
        }
      }
  
      renderProducts(filteredProducts)
    }
  
    // Show Search Results
    function showSearchResults(results) {
      searchResults.innerHTML = ""
  
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No products found</div>'
      } else {
        results.slice(0, 5).forEach((product) => {
          const resultItem = document.createElement("div")
          resultItem.classList.add("search-result-item")
  
          resultItem.innerHTML = `
                      <div class="search-result-image">
                          <img src="${product.image}" alt="${product.title}">
                      </div>
                      <div class="search-result-info">
                          <h4>${product.title}</h4>
                          <p>$${product.price.toFixed(2)}</p>
                      </div>
                  `
  
          resultItem.addEventListener("click", () => {
            openQuickView(product.id)
            searchResults.classList.remove("active")
          })
  
          searchResults.appendChild(resultItem)
        })
  
        if (results.length > 5) {
          const viewAll = document.createElement("div")
          viewAll.classList.add("search-view-all")
          viewAll.textContent = `View all ${results.length} results`
  
          viewAll.addEventListener("click", () => {
            // In a real app, this would navigate to search results page
            searchResults.classList.remove("active")
            document.getElementById("shop").scrollIntoView({ behavior: "smooth" })
          })
  
          searchResults.appendChild(viewAll)
        }
      }
  
      searchResults.classList.add("active")
    }
  
    // Add to Cart
    function addToCart(productId) {
      const product = products.find((p) => p.id === productId)
  
      if (!product) return
  
      // Check if product is already in cart
      const existingItem = cart.find((item) => item.id === productId)
  
      if (existingItem) {
        existingItem.quantity += 1
        showNotification(`Increased ${product.title} quantity in your cart! 🛒`, "success")
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
        showNotification(`${product.title} added to your cart! 🛒`, "success")
      }
  
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cart))
  
      // Update UI
      updateCartCount()
      renderCart()
      checkCartEmpty()
      updateCartTotal()
    }
  
    // Remove from Cart
    function removeFromCart(productId) {
      const itemIndex = cart.findIndex((item) => item.id === productId)
  
      if (itemIndex !== -1) {
        const removedItem = cart[itemIndex]
        cart.splice(itemIndex, 1)
  
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart))
  
        // Update UI
        updateCartCount()
        renderCart()
        checkCartEmpty()
        updateCartTotal()
  
        showNotification(`${removedItem.title} removed from your cart`, "success")
      }
    }
  
    // Update Cart Item Quantity
    function updateCartQuantity(productId, change) {
      const item = cart.find((item) => item.id === productId)
  
      if (item) {
        item.quantity += change
  
        if (item.quantity <= 0) {
          removeFromCart(productId)
          return
        }
  
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart))
  
        // Update UI
        renderCart()
        updateCartTotal()
      }
    }
  
    // Toggle Wishlist
    function toggleWishlist(productId) {
      const product = products.find((p) => p.id === productId)
  
      if (!product) return
  
      // Check if product is already in wishlist
      const existingItem = wishlist.find((item) => item.id === productId)
  
      if (existingItem) {
        // Remove from wishlist
        const itemIndex = wishlist.findIndex((item) => item.id === productId)
        wishlist.splice(itemIndex, 1)
        showNotification(`${product.title} removed from your wishlist`, "success")
      } else {
        // Add to wishlist
        wishlist.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
        showNotification(`${product.title} added to your wishlist! 💖`, "success")
      }
  
      // Save to localStorage
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
  
      // Update UI
      updateWishlistCount()
      renderWishlist()
      checkWishlistEmpty()
    }
  
    // Move Item from Wishlist to Cart
    function moveToCart(productId) {
      addToCart(productId)
  
      // Remove from wishlist
      const itemIndex = wishlist.findIndex((item) => item.id === productId)
      if (itemIndex !== -1) {
        wishlist.splice(itemIndex, 1)
  
        // Save to localStorage
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
  
        // Update UI
        updateWishlistCount()
        renderWishlist()
        checkWishlistEmpty()
      }
    }
  
    // Move Item from Cart to Wishlist
    function moveToWishlist(productId) {
      toggleWishlist(productId)
      removeFromCart(productId)
    }
  
    // Render Cart
    function renderCart() {
      cartItems.innerHTML = ""
  
      cart.forEach((item) => {
        const cartItem = document.createElement("div")
        cartItem.classList.add("cart-item")
  
        cartItem.innerHTML = `
                  <div class="cart-item-image">
                      <img src="${item.image}" alt="${item.title}">
                  </div>
                  <div class="cart-item-info">
                      <h4 class="cart-item-title">${item.title}</h4>
                      <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                      <div class="cart-item-quantity">
                          <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                          <span>${item.quantity}</span>
                          <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                      </div>
                  </div>
                  <div class="cart-item-actions">
                      <button class="move-to-wishlist-btn" data-id="${item.id}">
                          <i class="fas fa-heart"></i>
                      </button>
                      <button class="remove-item-btn" data-id="${item.id}">
                          <i class="fas fa-trash"></i>
                      </button>
                  </div>
              `
  
        cartItems.appendChild(cartItem)
      })
  
      // Add event listeners to cart item buttons
      document.querySelectorAll(".decrease-quantity").forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = Number.parseInt(this.dataset.id)
          updateCartQuantity(productId, -1)
        })
      })
  
      document.querySelectorAll(".increase-quantity").forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = Number.parseInt(this.dataset.id)
          updateCartQuantity(productId, 1)
        })
      })
  
      document.querySelectorAll(".remove-item-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = Number.parseInt(this.dataset.id)
          removeFromCart(productId)
        })
      })
  
      document.querySelectorAll(".move-to-wishlist-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = Number.parseInt(this.dataset.id)
          moveToWishlist(productId)
        })
      })
    }
  
    // Render Wishlist
    function renderWishlist() {
      wishlistItems.innerHTML = ""
  
      wishlist.forEach((item) => {
        const wishlistItem = document.createElement("div")
        wishlistItem.classList.add("wishlist-item")
  
        wishlistItem.innerHTML = `
                  <div class="wishlist-item-image">
                      <img src="${item.image}" alt="${item.title}">
                  </div>
                  <div class="wishlist-item-info">
                      <h4 class="wishlist-item-title">${item.title}</h4>
                      <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
                  </div>
                  <div class="wishlist-item-actions">
                      <button class="add-to-cart-from-wishlist-btn" data-id="${item.id}">
                          <i class="fas fa-shopping-bag"></i>
                      </button>
                      <button class="remove-item-btn" data-id="${item.id}">
                          <i class="fas fa-trash"></i>
                      </button>
                  </div>
              `
  
        wishlistItems.appendChild(wishlistItem)
      })
  
      // Add event listeners to wishlist item buttons
      document.querySelectorAll(".add-to-cart-from-wishlist-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = Number.parseInt(this.dataset.id)
          moveToCart(productId)
        })
      })
  
      document.querySelectorAll(".remove-item-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = Number.parseInt(this.dataset.id)
          toggleWishlist(productId)
        })
      })
    }
  
    // Update Cart Count
    function updateCartCount() {
      const count = cart.reduce((total, item) => total + item.quantity, 0)
      cartCount.textContent = count
    }
  
    // Update Wishlist Count
    function updateWishlistCount() {
      wishlistCount.textContent = wishlist.length
    }
  
    // Check if Cart is Empty
    function checkCartEmpty() {
      if (cart.length === 0) {
        emptyCart.style.display = "flex"
        cartItems.style.display = "none"
        cartFooter.style.display = "none"
      } else {
        emptyCart.style.display = "none"
        cartItems.style.display = "block"
        cartFooter.style.display = "block"
      }
    }
  
    // Check if Wishlist is Empty
    function checkWishlistEmpty() {
      if (wishlist.length === 0) {
        emptyWishlist.style.display = "flex"
        wishlistItems.style.display = "none"
      } else {
        emptyWishlist.style.display = "none"
        wishlistItems.style.display = "block"
      }
    }
  
    // Update Cart Total
    function updateCartTotal() {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      cartTotalAmount.textContent = `$${total.toFixed(2)}`
    }
  
    // Open Quick View
    function openQuickView(productId) {
      const product = products.find((p) => p.id === productId)
  
      if (!product) return
  
      // Check if product is in wishlist
      const inWishlist = wishlist.some((item) => item.id === productId)
  
      // Generate rating stars
      const stars = generateStars(product.rating)
  
      // Generate color options
      let colorOptionsHtml = ""
      if (product.colors && product.colors.length > 0) {
        product.colors.forEach((color) => {
          colorOptionsHtml += `
                      <div class="color-option" style="background-color: ${color};" data-color="${color}"></div>
                  `
        })
      }
  
      // Generate size options
      let sizeOptionsHtml = ""
      if (product.sizes && product.sizes.length > 0) {
        product.sizes.forEach((size) => {
          sizeOptionsHtml += `
                      <div class="size-option" data-size="${size}">${size}</div>
                  `
        })
      }
  
      quickViewProduct.innerHTML = `
              <div class="quick-view-gallery">
                  <div class="quick-view-main-image">
                      <img src="${product.image}" alt="${product.title}">
                  </div>
                  <div class="quick-view-thumbnails">
                      <div class="quick-view-thumbnail active">
                          <img src="${product.image}" alt="${product.title}">
                      </div>
                      <div class="quick-view-thumbnail">
                          <img src="/placeholder.svg?height=400&width=300" alt="${product.title}">
                      </div>
                      <div class="quick-view-thumbnail">
                          <img src="/placeholder.svg?height=400&width=300" alt="${product.title}">
                      </div>
                  </div>
              </div>
              <div class="quick-view-info">
                  <div class="quick-view-category">${product.category}</div>
                  <h2 class="quick-view-title">${product.title}</h2>
                  <div class="quick-view-price">
                      <span class="quick-view-current-price">$${product.price.toFixed(2)}</span>
                      ${product.oldPrice ? `<span class="quick-view-old-price">$${product.oldPrice.toFixed(2)}</span>` : ""}
                  </div>
                  <div class="quick-view-rating">
                      <div class="quick-view-stars">${stars}</div>
                      <span class="quick-view-reviews">${product.ratingCount} reviews</span>
                  </div>
                  <p class="quick-view-description">${product.description}</p>
                  
                  ${
                    product.colors && product.colors.length > 0
                      ? `
                  <div class="quick-view-colors">
                      <h4>Color</h4>
                      <div class="color-options">
                          ${colorOptionsHtml}
                      </div>
                  </div>
                  `
                      : ""
                  }
                  
                  ${
                    product.sizes && product.sizes.length > 0
                      ? `
                  <div class="quick-view-sizes">
                      <h4>Size</h4>
                      <div class="size-options">
                          ${sizeOptionsHtml}
                      </div>
                  </div>
                  `
                      : ""
                  }
                  
                  <div class="quick-view-actions">
                      <div class="quick-view-quantity">
                          <button class="quick-view-quantity-decrease">-</button>
                          <input type="number" value="1" min="1" max="99">
                          <button class="quick-view-quantity-increase">+</button>
                      </div>
                      <button class="btn btn-primary quick-view-add-to-cart" data-id="${product.id}">
                          Add to Cart
                      </button>
                      <button class="quick-view-wishlist ${inWishlist ? "active" : ""}" data-id="${product.id}">
                          <i class="fas fa-heart"></i>
                      </button>
                  </div>
              </div>
          `
  
      // Add event listeners to quick view elements
      const quantityInput = quickViewProduct.querySelector(".quick-view-quantity input")
      const decreaseBtn = quickViewProduct.querySelector(".quick-view-quantity-decrease")
      const increaseBtn = quickViewProduct.querySelector(".quick-view-quantity-increase")
      const addToCartBtn = quickViewProduct.querySelector(".quick-view-add-to-cart")
      const wishlistBtn = quickViewProduct.querySelector(".quick-view-wishlist")
      const colorOptions = quickViewProduct.querySelectorAll(".color-option")
      const sizeOptions = quickViewProduct.querySelectorAll(".size-option")
      const thumbnails = quickViewProduct.querySelectorAll(".quick-view-thumbnail")
  
      decreaseBtn.addEventListener("click", () => {
        if (quantityInput.value > 1) {
          quantityInput.value = Number.parseInt(quantityInput.value) - 1
        }
      })
  
      increaseBtn.addEventListener("click", () => {
        quantityInput.value = Number.parseInt(quantityInput.value) + 1
      })
  
      addToCartBtn.addEventListener("click", function () {
        const productId = Number.parseInt(this.dataset.id)
        const quantity = Number.parseInt(quantityInput.value)
  
        // Add to cart multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
          addToCart(productId)
        }
  
        // Close quick view
        quickViewModal.classList.remove("active")
        overlay.classList.remove("active")
      })
  
      wishlistBtn.addEventListener("click", function () {
        const productId = Number.parseInt(this.dataset.id)
        toggleWishlist(productId)
        this.classList.toggle("active")
      })
  
      colorOptions.forEach((option) => {
        option.addEventListener("click", function () {
          colorOptions.forEach((opt) => opt.classList.remove("active"))
          this.classList.add("active")
        })
      })
  
      sizeOptions.forEach((option) => {
        option.addEventListener("click", function () {
          sizeOptions.forEach((opt) => opt.classList.remove("active"))
          this.classList.add("active")
        })
      })
  
      thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", function () {
          thumbnails.forEach((thumb) => thumb.classList.remove("active"))
          this.classList.add("active")
  
          const mainImage = quickViewProduct.querySelector(".quick-view-main-image img")
          mainImage.src = this.querySelector("img").src
        })
      })
  
      // Show first color and size as selected by default
      if (colorOptions.length > 0) {
        colorOptions[0].classList.add("active")
      }
  
      if (sizeOptions.length > 0) {
        sizeOptions[0].classList.add("active")
      }
  
      // Show quick view modal
      quickViewModal.classList.add("active")
      overlay.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  
    // Toggle Theme
    function toggleTheme() {
      const body = document.body
      const themeIcon = document.querySelector("#theme-toggle i")
      const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
  
      if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode")
        themeIcon.classList.remove("fa-sun")
        themeIcon.classList.add("fa-moon")
        mobileThemeToggle.checked = false
        localStorage.setItem("theme", "light")
      } else {
        body.classList.add("dark-mode")
        themeIcon.classList.remove("fa-moon")
        themeIcon.classList.add("fa-sun")
        mobileThemeToggle.checked = true
        localStorage.setItem("theme", "dark")
      }
    }
  
    // Show Notification
    function showNotification(message, type) {
      const notificationEl = document.getElementById("notification")
      const notificationIcon = notificationEl.querySelector(".notification-icon")
      const notificationMessage = notificationEl.querySelector(".notification-message")
  
      notificationIcon.className = "notification-icon"
      notificationIcon.classList.add(type)
  
      if (type === "success") {
        notificationIcon.innerHTML = '<i class="fas fa-check-circle"></i>'
      } else if (type === "error") {
        notificationIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>'
      }
  
      notificationMessage.textContent = message
  
      notificationEl.classList.add("active")
  
      setTimeout(() => {
        notificationEl.classList.remove("active")
      }, 3000)
    }
  
    // Show Discount Popup
    function showDiscountPopup() {
      discountPopup.classList.add("active")
      overlay.classList.add("active")
    }
  
    // Show Loyalty Badge
    function showLoyaltyBadge() {
      loyaltyBadge.classList.add("active")
  
      setTimeout(() => {
        loyaltyBadge.classList.remove("active")
      }, 5000)
    }
  
    // Check Theme Preference
    function checkThemePreference() {
      const savedTheme = localStorage.getItem("theme")
      const themeIcon = document.querySelector("#theme-toggle i")
      const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
  
      if (savedTheme === "dark") {
        document.body.classList.add("dark-mode")
        themeIcon.classList.remove("fa-moon")
        themeIcon.classList.add("fa-sun")
        mobileThemeToggle.checked = true
      }
    }
  
    // Initialize
    checkThemePreference()
    init()
  })