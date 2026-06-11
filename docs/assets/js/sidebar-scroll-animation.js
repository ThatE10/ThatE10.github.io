// Sidebar scroll-in animation
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.custom-sidebar');
  const heroSection = document.querySelector('.custom-hero-section');

  if (!sidebar || !heroSection) return;

  const heroHeight = heroSection.offsetHeight;
  let hasAnimated = false;

  function checkScroll() {
    const scrollY = window.scrollY;
    const triggerPoint = heroHeight - 100;

    if (scrollY > triggerPoint && !hasAnimated) {
      sidebar.classList.add('sidebar-visible');
      hasAnimated = true;
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });

  // Check on page load in case user is already scrolled
  checkScroll();
});
