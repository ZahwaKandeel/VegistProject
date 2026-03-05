// Fetching all countries

$((function () {
    // get all countries
    $.ajax({
        url: "https://countriesnow.space/api/v0.1/countries",
        method: "GET",
        success: function (result) {
            const data = result.data;
            console.log("data", data)
            const $selectCountry = $("#country");
            const $selectCity = $("#city");
            
            $.each(data, function (index, selected) {
                const countryOption = $("<option>", {
                text: selected.country
                });
                $selectCountry.append(countryOption);
            });
            $selectCountry.on("change", function() {
                const selectedCountry = $(this).val();

                // clear city selection
                $selectCity.empty();
                const selected = data.find(c => c.country === selectedCountry);

                if (!selected) return;
                // sort city ACS
                selected.cities.sort((a, b) => a.localeCompare(b));

                $.each(selected.cities, function (_, city) {
                    $selectCity.append(
                        $("<option>", {
                            text: city
                        })
                    );
                });
            })
        },
        error: function () {
        console.error("Failed to load countries");
        }
    });
}));
