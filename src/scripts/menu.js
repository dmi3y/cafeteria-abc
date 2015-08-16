jQuery(function cafeteriamenu($) {

	var menu = $.ajax('https://cafeteria-abc.firebaseio.com/menu.json');
	var details = $.ajax('https://cafeteria-abc.firebaseio.com/pricedetails.json');

	$.when(menu, details)
		.done(function(menu, details) {

			var tmpl = Templates['menu-table'];

			var html = tmpl({
				menu: menu[0],
				details: details[0]
			});

			$('#cafeteriaMenu').append(html);
			$('#cafeteriaMenu .verticalSlider').verticalSlider();

		}
	);
});