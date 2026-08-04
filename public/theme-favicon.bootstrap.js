(function () {
	try {
		var dark = '/favicons/favicon.svg';
		var light = '/favicons/favicon-light.svg';
		var stored = localStorage.getItem('theme');
		var isDark =
			!stored || stored === 'system' ? window.matchMedia('(prefers-color-scheme: dark)').matches : stored === 'dark';
		var href = isDark ? dark : light;
		var link = document.querySelector('link[rel="icon"][data-theme-favicon]');
		if (!link) {
			link = document.createElement('link');
			link.rel = 'icon';
			link.type = 'image/svg+xml';
			link.setAttribute('data-theme-favicon', '');
			document.head.appendChild(link);
		}
		link.href = href;
	} catch {}
})();
