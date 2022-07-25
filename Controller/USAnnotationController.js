async function createAnnotation() {
    const annotationLabels = [
        {
            note: {
                label: "2021-01-12, US 7 day avg death number reached the peak value: 3379",
                title: "Peak value",
                wrap: 250
            },
            x: 313,
            y: 430,
            dy: -50,
            dx: -80,
            color: ["red"],
            className: "annotation-peak"
        }
    ];

    const annotationRects = [
        {
            note: {
                label: "At the end of 2021, there's a huge spike of new confirmed cases due to Christmas[1]",
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
                label: "Case fatality ratio was down to 0.003 after 2022 April",
                title: "Decreased case fatality ratio",
                wrap: 250
            },
            x: 663,
            y: 720,
            dy: -230,
            dx: -65,
            color: ["blue"],
            subject: {
                radius: 50,
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