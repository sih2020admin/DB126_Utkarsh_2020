"use strict";
$('#approved_button').click(() => {
    $('.details').hide();
    $('.statistics').hide();
    $('.approved_tenders').fadeTo('fast', 1);
    document.getElementById("profile_button").classList.remove("active");
    document.getElementById("stat_button").classList.remove("active");
    document.getElementById("approved_button").classList.add("active");
});
$('#profile_button').click(() => {
    $('.approved_tenders').hide();
    $('.statistics').hide();
    $('.details').fadeTo('fast', 1);
    document.getElementById("approved_button").classList.remove("active");
    document.getElementById("stat_button").classList.remove("active");
    document.getElementById("profile_button").classList.add("active");
});
$('#stat_button').click(() => {
    $('.details').hide();
    $('.approved_tenders').hide();
    $('.statistics').fadeTo('fast', 1);
    document.getElementById("stat_button").classList.add("active");
    document.getElementById("profile_button").classList.remove("active");
    document.getElementById("approved_button").classList.remove("active");
});
function getChartData(results) {
    return [results[0][0]['count'], results[1][0]['count'], results[2][0]['count'], results[3][0]['count']];
}
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            // Get ctx from string
            var ctx = chart.chart.ctx;
            // Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var maxFontSize = centerConfig.maxFontSize || 75;
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
            // Start with a base font of 30px
            ctx.font = '30px ' + fontStyle;
            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;
            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = chart.innerRadius * 2;
            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
            var minFontSize = centerConfig.minFontSize;
            var lineHeight = centerConfig.lineHeight || 25;
            var wrapText = false;
            if (minFontSize === undefined) {
                minFontSize = 20;
            }
            if (minFontSize && fontSizeToUse < minFontSize) {
                fontSizeToUse = minFontSize;
                wrapText = true;
            }
            // Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.font = fontSizeToUse + 'px ' + fontStyle;
            ctx.fillStyle = color;
            if (!wrapText) {
                ctx.fillText(txt, centerX, centerY);
                return;
            }
            var words = txt.split(' ');
            var line = '';
            var lines = [];
            // Break words up into multiple lines if necessary
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > elementWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                }
                else {
                    line = testLine;
                }
            }
            // Move the center up depending on line height and number of lines
            centerY -= (lines.length / 2) * lineHeight;
            for (var n = 0; n < lines.length; n++) {
                ctx.fillText(lines[n], centerX, centerY);
                centerY += lineHeight;
            }
            //Draw text in center
            ctx.fillText(line, centerX, centerY);
        }
    },
});
$.post('/admin/statistics').then((results) => {
    for(let i = 0 ;i < results[0].length;i++){
        $('#table1 > tbody:last-child').append(
            `<tr>
                <td>${results[0][i]["Reference"]}</td>
                <td>${results[0][i]["Title"]}</td>
                <td>${results[0][i]["Description"]}</td>
                <td>${results[0][i]["Count"]}</td>
            </tr>
            `);
    }
    for(let i = 0 ;i < results[2].length;i++){
        $('#table2 > tbody:last-child').append(
            `<tr>
                <td>${results[2][i]["reference"]}</td>
                <td>${results[2][i]["title"]}</td>
                <td>${results[2][i]["description"]}</td>
                <td>${results[2][i]["Count"]}</td>
            </tr>
            `);
    }
    
    if (getChartData(results[1]).reduce((a, b) => a + b, 0) === 0) {
        alert('N applications to show');
        $('#mycanvas').html('Cannot load stats for this tender');
    }
    else {
        let ctx = document.getElementById('mycanvas').getContext('2d');
        let ctx_bar = document.getElementById('bar').getContext('2d');
        /* let pie = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: getChartData(results[1]),
                        backgroundColor: ['#0074D9', '#FF4136', '#2ECC40', '#fffff'],
                    },
                ],
                labels: ['Applications on Payment Stage', 'Applications on E-Signing stage', 'Applications on Confirmation Stage', 'Registerd Applications'],
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart showing Vendor Applications on various stages',
                    fontSize: 16,
                },
                legend: {
                    position: 'right',
                    align: 'start',
                },
                elements: {
                    //@ts-ignore
                    center: {
                        text: `${getChartData(results[1]).reduce((a, b) => a + b, 0)}`,
                        color: '#000000',
                        fontStyle: 'Arial',
                        sidePadding: 20,
                        minFontSize: 20,
                        lineHeight: 20,
                    },
                },
            },
        }); */
        //console.log(results[1].map((rob) => `${rob['et_id']}`));
        let bar = new Chart(ctx_bar, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: '  ',
                        data: results[0].map((rob) => rob['Count']),
                        backgroundColor: getBarChartColor(results[0].length),
                    },
                ],
                labels: results[0].map((rob) => `${rob['Title']}`),
            },
            options: {
                title:{
                    display:true,
                    text:'Number of applications per tender',
                    fontsize:16
                },
                legend: {
                    position: 'right',
                    align: 'start',
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            precision:0,
                            min: 0                                
                        }
                    }]
                }
            }
        });
    }
});
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getBarChartColor(length) {
    let temp = [];
    for (let i = 0; i < length; i++) {
        temp.push(getRandomColor());
    }
    return temp;
}
