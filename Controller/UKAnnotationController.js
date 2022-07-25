async function createAnnotation() {
    const annotationLabels = [
        {
            note: {
                label: "2020-04-13, UK 7 days case fatality ratio reached peak value: 0.21",
                title: "Peak case fatality ratio",
                wrap: 250
            },
            x: 128,
            y: 512,
            dy: -82,
            dx: 70,
            color: ["red"],
            className: "annotation-peak"
        }
    ];

    const annotationRects = [
        {
            note: {
                label: "UK also have this spike ath the end of 2021 due to Christmas and Omicron variant",
                title: "Holiday peak"
            },
            x: 570,
            y: 80,
            dy: 100,
            dx: -80,
            color: ["red"],
            subject: {
                width: -50,
                height: 200
            },
            className: "annotation-peak"
        }
    ];

    const annotationCircles = [
        {
            note: {
                label: "Case fatality ratio decreases to 0.003 after 2022",
                title: "Decreased case fatality ratio",
                wrap: 200
            },
            x: 633,
            y: 730,
            dy: -250,
            dx: -100,
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