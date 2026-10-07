$(document).ready(function() {
    // Khởi tạo MapSVG
    $("#mapsvg").mapSvg({
        width: 1920,
        height: 4054,
        colors: {
            baseDefault: "#000000",
            background: "#eeeeee",
            directory: "#fafafa",
            status: {},
            selected: -20,
            hover: -20
        },
        viewBox: [0, 0, 1920, 4054],
        cursor: "pointer",
        gauge: {
            on: false,
            labels: {
                low: "low",
                high: "high"
            },
            colors: {
                lowRGB: {
                    r: 85,
                    g: 0,
                    b: 0,
                    a: 1
                },
                highRGB: {
                    r: 238,
                    g: 0,
                    b: 0,
                    a: 1
                },
                low: "#550000",
                high: "#ee0000",
                diffRGB: {
                    r: 153,
                    g: 0,
                    b: 0,
                    a: 0
                }
            },
            min: 0,
            max: false
        },
        source: "./bandoPC2.svg",
        title: "BandoPC1",
        responsive: true,
        mouseOver: function(e, mapsvg){
            var region = this;
            
        },
    
        onClick: function (e, mapsvg) {
            var clickedRegion = this;
            $('.overlay').addClass('open');
            $('body').addClass('p-overflow-hidden');
        },
        afterLoad: function(){
        }
    });

    // Thêm minimap
    $('#minimap-container').mapSvg({
        source: "./minimap.svg",
        width: 304,
        height: 304,
        responsive: true
    });
    
    $('#mapCha').on('scroll', function() {
        // Lấy tọa độ hiển thị trên map chính
        var mainMapX = $('#mapCha').scrollLeft();
        var mainMapY = $('#mapCha').scrollTop();
    
        // Chuyển đổi tọa độ từ map chính sang minimap
        var minimapX = mainMapX * ($('#minimap-container .mapsvg-scrollpane').width() /  $('#mapCha').width());
        var minimapY = (mainMapY * (($('#minimap-container .mapsvg-scrollpane').height()-50) /  $('#mapsvg .mapsvg-scrollpane svg').height()) )+25 ;
        // Di chuyển hình vuông trên minimap đến vị trí mới
        // $("#todoMap").attr('x', minimapX);
        $("#todoMap").attr('y', minimapY);
    });
    
    

    var isDragging = false;
    var lastY = 0;
    var scrollContent = $('#mapCha .mapsvg-wrap');
    var scrollContainer = $('#mapCha');

    $('#mapCha').mousedown(function(e) {
        isDragging = true;
        lastY = e.clientY;
        scrollContent.css('cursor', 'grabbing');
    });
    $(document).mousemove(function(e) {
        if(isDragging) {
            var deltaY = e.clientY - lastY;
            var scrollTop = $('#mapCha').scrollTop() - deltaY;
            if($('#mapCha').scrollTop() < 2913)
                $('#mapCha').scrollTop(scrollTop);
            else{
                if(lastY < e.clientY){
                    $('#mapCha').scrollTop(scrollTop);
                }
            }
            lastY = e.clientY;
        }
    });

    $(document).mouseup(function() {
        isDragging = false;
        scrollContent.css('cursor', 'grab');
    });
});
