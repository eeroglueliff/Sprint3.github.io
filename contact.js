$(document).ready(function() {
    $("#contact-form").submit(function(event) {
        event.preventDefault(); 
        var formData = $(this).serialize(); 

        
        $("#response-message").html("Teşekkürler, " + $("#name").val() + ", mesajınız gönderildi").fadeIn();
        
        $(this).trigger("reset");
        setTimeout(function() { $('#response-message').fadeOut(); }, 5000); 

    });

    var events = {
        "2024-06-03": { title: "Yüzme Etkinliği", time: "14:00", location: "Bağlıca", description: "Bağlıca Spor Kompleksi'nde yüzme etkinliği düzenlenecektir." } ,
        "2024-05-20": { title: "Deneme Sınavı", time: "10:00", location: "8G Akademi", description: "Palme Yayinevi işbirliği ile 5,6,7 ve 8. Sınıflara özel deneme sınavı yapılacaktır." },
        "2024-06-15": { title: "Sinema Etkinliği", time: "20:00", location: "Bağlıca", description: "Akademimizin etkinlik salonunda öğrencilerimizle buluşuyoruz." } ,


    };

    $("#datepicker").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: 'yy-mm-dd', 
        
        beforeShowDay: function(date) {
            var dateString = $.datepicker.formatDate('yy-mm-dd', date);
            if (events[dateString]) {
                return [true, "event-day", events[dateString].title]; 
            }
            return [true, "", ""];
        },
        onSelect: function(dateText) {
            if (events[dateText]) {
                showEventDetails(events[dateText]);
            }
        }
    });

    function showEventDetails(event) {
        var detailsHtml = `<h3>${event.title}</h3>
                           <p><strong>Zaman:</strong> ${event.time}</p>
                           <p><strong>Konum:</strong> ${event.location}</p>
                           <p><strong>Açıklama:</strong> ${event.description}</p>`;
    
        $("#event-details").html(detailsHtml);
        $("#event-details").dialog({ title: "Etkinlik Detayları", modal: true }); 
    }
    
    

    var currentIndex = 0; 
    const photoList = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg' , 'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg', 'photo10.jpg', 'photo11.jpg', 'photo12.jpg',  'photo13.jpg', 'photo14.jpg', 'photo15.jpg' ,'photo16.jpg','photo17.jpg','photo18.jpg','photo19.jpg','photo20.jpg','photo21.jpg']; 

    const gallery = $("#photo-Galeri");
    photoList.forEach(function(photo, index) {
        $('<img>', {
            src: photo,
            click: function() {
                currentIndex = index;
                updateImageInDialog(photo);
            }
        }).appendTo(gallery);
    });

    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        width: "auto",
        resizable: false,
        draggable: false,
        open: function() {
            $('.ui-widget-overlay').css({
                opacity: 0.8, 
                backgroundColor: "black" 
            });
            $('#prev').toggle(currentIndex >= 0);
            $('#next').toggle(currentIndex <= photoList.length - 1);
        },
        close: function() {
            $("#modal-image").attr('src', ''); 
        }
    });

    $('#next').click(function(e) {
        e.preventDefault();
        if (currentIndex < photoList.length - 1) {
            currentIndex++;
            updateImageInDialog(photoList[currentIndex]);
        }
    });

    $('#prev').click(function(e) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            updateImageInDialog(photoList[currentIndex]);
        }
    });

    function updateImageInDialog(src) {
        $('#modal-image').attr('src', src);
        $("#dialog").dialog("option", "title", "Image " + (currentIndex + 1)).dialog("open");
    }});
