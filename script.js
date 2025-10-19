function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove "active" class from all tab buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add "active" class to the button
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Open the default tab when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // If a tab is open via URL hash (not implemented here but good practice), don't open default
    if (!window.location.hash) {
        document.getElementById("defaultOpen").click();
    }
});

// Toggle an attached dropdown for a tab button
function toggleTabDropdown(el) {
    if (!el) return;
    // find the nearest .tab-item and its .tab-dropdown
    var item = el.closest('.tab-item');
    if (!item) return;
    var menu = item.querySelector('.tab-dropdown');
    if (!menu) return;

    // close other dropdowns
    document.querySelectorAll('.tab-dropdown').forEach(function(d){
        if (d !== menu) d.classList.remove('show');
        
        // Also ensure the aria-expanded is set to false on the toggle button of the closed dropdown
        var closedItem = d.closest('.tab-item');
        if (closedItem) {
            // Target the .tab-caret button to remove the attribute
            var closedToggle = closedItem.querySelector('.tab-caret');
            if (closedToggle) closedToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // toggle this one
    var isShown = menu.classList.toggle('show');
    // Set aria-expanded on the button that was clicked (el is the tab-caret)
    el.setAttribute('aria-expanded', isShown ? 'true' : 'false');
}

// Close dropdowns when clicking outside (FIXED)
window.addEventListener('click', function(e){
    // If the click target is inside a tab-dropdown, we return, 
    // as clicks there are handled by the menu buttons (openTabFromMenu).
    if (e.target.closest('.tab-dropdown') || e.target.closest('.tab-caret')) {
        return;
    }
    
    // Close any open dropdowns when clicking anywhere else, 
    // including on the main tab buttons (.tablinks) or the page content.
    document.querySelectorAll('.tab-dropdown.show').forEach(function(d){
        d.classList.remove('show');
        // Find the specific toggle button (.tab-caret) for this dropdown and set aria-expanded to false
        var parentItem = d.closest('.tab-item');
        var parentBtn = parentItem.querySelector('.tab-caret');
        if (parentBtn) parentBtn.setAttribute('aria-expanded', 'false');
    });
});

// Open a tabcontent by its id (tabName) without requiring a tab button click
function openTabByName(tabName) {
    if (!tabName) return;
    var i, tabcontent, tablinks;
    
    // Hide all content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Remove active class from all tab buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the requested content
    var el = document.getElementById(tabName);
    if (el) el.style.display = 'block';

    // try to mark a tab button active if it matches the tabName
    // We check for an explicit tab button with that ID first, then by text content (label)
    var explicitTab = document.querySelector('.tablinks[id="defaultOpen"]');
    if (explicitTab && explicitTab.textContent.trim() === tabName) {
        explicitTab.className += ' active';
        return;
    }

    for (i = 0; i < tablinks.length; i++) {
        var labelEl = tablinks[i].querySelector('.tab-label');
        var label = labelEl ? labelEl.textContent.trim() : tablinks[i].textContent.trim();
        
        if (label === tabName) {
            tablinks[i].className += ' active';
            break;
        }
    }
}

// Called from dropdown menu items: opens the requested tabcontent and closes dropdowns
function openTabFromMenu(event, tabName, el) {
    if (event) event.stopPropagation();
    
    // close dropdowns and reset their aria-expanded state
    document.querySelectorAll('.tab-dropdown.show').forEach(function(d){ 
        d.classList.remove('show'); 
        var parentItem = d.closest('.tab-item');
        var parentBtn = parentItem.querySelector('.tab-caret');
        if (parentBtn) parentBtn.setAttribute('aria-expanded', 'false');
    });
    
    openTabByName(tabName);
}