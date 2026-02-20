// Fetching all countries

$((function () {

$.ajax({
    url: "https://countriesnow.space/api/v0.1/countries/positions",
    method: "GET",
    success: function (result) {
        const countries = result.data;
        const $select = $("#country");
        // sort ASC
        countries.sort((a, b) => a.name.localeCompare(b.name));
        
        $.each(countries, function (index, country) {
            const option = $("<option>", {
            text: country.name
            });
            $select.append(option);
        });
    },
    error: function () {
    console.error("Failed to load countries");
    }
});

}));
