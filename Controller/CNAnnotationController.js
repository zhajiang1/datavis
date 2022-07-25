async function createAnnotation() {
    const annotationLabels = [
        {
            note: {
                label: "2020-02-19, CN 7 days death value reached peak value. Case fatality ratio at that day is 0.033",
                title: "Peak value",
                wrap: 250
            },
            x: 98,
            y: 427,
            dy: -82,
            dx: 120,
            color: ["red"],
            className: "annotation-peak"
        }
    ];

    const annotationRects = [
        {
            note: {
                label: "During this period, average new confirmed case per day is lower than 100",
                title: "Stable state",
                wrap: 250
            },
            x: 540,
            y: 730,
            dy: -100,
            dx: -150,
            color: ["blue"],
            subject: {
                width: -350,
                height: 50
            },
            className: "annotation-bottom"
        }
    ];

    const annotationCircles = [
        {
            note: {
                label: "Omicron variant and holiday causes the peak in early 2022, with ~0.003 case fatality ratio",
                title: "Peak due to holiday and Omicron",
                wrap: 250
            },
            x: 633,
            y: 710,
            dy: -250,
            dx: -50,
            color: ["blue"],
            subject: {
                radius: 55,
                radiusPadding: 1
            },
            className: "annotation-bottom"
        }
    ]

    const makeAnnotationLabels = d3.annotation()
        .notePadding(15)
        .type(d3.annotationLabel)
        .annotations(annotationLabels);

    const makeAnnotationCircles = d3.annotation()
        .notePadding(15)
        .type(d3.annotationCalloutCircle)
        .annotations(annotationCircles);

    const makeAnnotationRects = d3.annotation()
        .notePadding(15)
        .type(d3.annotationCalloutRect)
        .annotations(annotationRects);

    d3.select("#vis")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotationLabels);

    d3.select("#vis")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotationCircles);

    d3.select("#vis")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotationRects);
}