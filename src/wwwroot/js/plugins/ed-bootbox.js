bootbox.setDefaults({
    locale: "ru",
    show: true,
    backdrop: true,
    closeButton: true,
    animate: true
});

function showModal(textToDisplay) {
    if ($("div.bootbox").length === 0) {

        if (!bootbox) {
            console.error("Bootbox is not loaded");
            alert("Bootbox is not loaded");
            return;
        }
        if (stringIsNullOrWhitespace(textToDisplay)) {
            console.error("string is null or whitespace");
            return;
        }

        bootbox.alert({
            message: textToDisplay,
            backdrop: true,
            centerVertical: true
        });
    }
}

function stringIsNullOrWhitespace(str) {
    return !str || (!!str && str.trim().length === 0);
}