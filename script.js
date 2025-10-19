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
    document.getElementById("defaultOpen").click();
});

// Toggle an attached dropdown for a tab button
function toggleTabDropdown(el) {
    if (!el) return;
    // find the nearest .tab-item and its .tab-dropdown
    var item = el.closest('.tab-item');
    if (!item) return;
    var menu = item.querySelector('.tab-dropdown');
    if (!menu) return;

    // the actual tab button
    var tabBtn = item.querySelector('.tablinks');

    // close other dropdowns
    document.querySelectorAll('.tab-dropdown').forEach(function(d){
        if (d !== menu) d.classList.remove('show');
    });

    // toggle this one
    var isShown = menu.classList.toggle('show');
    if (tabBtn) tabBtn.setAttribute('aria-expanded', isShown ? 'true' : 'false');
}

// Close dropdowns when clicking outside
window.addEventListener('click', function(e){
    // if click is on a tab button, ignore (we handle via onclick on button)
    if (e.target.matches('.tablinks')) return;

    // close any open dropdowns
    document.querySelectorAll('.tab-dropdown.show').forEach(function(d){
        d.classList.remove('show');
        var parentBtn = d.parentElement.querySelector('.tablinks');
        if (parentBtn) parentBtn.setAttribute('aria-expanded', 'false');
    });
});

// Open a tabcontent by its id (tabName) without requiring a tab button click
function openTabByName(tabName) {
    if (!tabName) return;
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    var el = document.getElementById(tabName);
    if (el) el.style.display = 'block';

    // try to mark a tab button active if it matches the tabName (by label)
    for (i = 0; i < tablinks.length; i++) {
        var label = tablinks[i].textContent.trim();
        if (label === tabName) {
            tablinks[i].className += ' active';
            break;
        }
    }
}

// Called from dropdown menu items: opens the requested tabcontent and closes dropdowns
function openTabFromMenu(event, tabName, el) {
    if (event) event.stopPropagation();
    // close dropdowns
    document.querySelectorAll('.tab-dropdown.show').forEach(function(d){ d.classList.remove('show'); });
    openTabByName(tabName);
}