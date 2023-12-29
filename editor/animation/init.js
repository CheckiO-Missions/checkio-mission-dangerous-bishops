requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function dangerous_bishops_visualization(tgt_node, data) {
            if (!data || !data.ext) {
                return
            }

            /**
             * 
             * attr
             * 
             */
            const attr = {
                grid: {
                    'stroke-width': '1px',
                    'stroke': '#65A1CF',
                },
                bishop: {
                    'fill': '#65A1CF',
                    'fill': '#006CA9',
                    'stroke-width': '0px',
                },
                move: {
                    'stroke-width': '.1px',
                    'stroke': '#65A1CF',
                    'arrow-end': 'block-wide-long',
                },
                number: {
                    'font-family': 'times',
                    'font-weight': 'bold',
                },
                number_cell: {
                    'fill': '#F0801A',
                    'fill': '#82D1F5',
                    'stroke-width': '1px',
                    'stroke': '#65A1CF',
                    'opacity' : .5,
                },
            }

            /**
            * 
            * values
            * 
            */
            // const board_size = 4
            // const bishops = [[2, 3], [0, 1]]
            const input = data.in
            const board_size = input[0]
            const bishops = input[1]
            const draw_area_size = 200
            const os = 10
            const standard_unit_size = 40
            const unit = draw_area_size / board_size
            const scale = unit / standard_unit_size
            const b1 = "m 3.8998427579999997,37.258468380000004 c -1.32460902,-0.6531587999999999 -1.0774171799999999,-2.56358592 0.38257254,-2.95671978 l 0.49960763999999996,-0.13453020000000002 -0.62313174,-0.35588574 c -0.90480096,-0.51675246 -1.1247516000000002,-1.121715 -0.7188363,-1.9771163999999999 0.28155707999999996,-0.59333904 0.57363642,-0.76030794 2.49005106,-1.42345476 1.88224344,-0.65132172 2.00628414,-0.79384284 1.34570772,-1.5461964 -0.42531552,-0.48440826000000003 -0.64159326,-0.96638724 -0.64159326,-1.42980516 0.0,-0.53436852 0.43841574000000005,-1.5877638 1.10049408,-2.64418812 1.47641004,-2.35579428 1.91784222,-3.69949734 2.2321089,-6.7944618000000006 0.04222008,-0.4158 0.10844063999999999,-0.968625 0.1471554,-1.2285 l 0.07039242,-0.47250000000000003 -0.4835754,-0.005481 c -0.74361798,-0.008442 -1.57329396,-0.19940256 -1.6939881,-0.38989944 -0.05980086,-0.09438786 -0.10959732000000001,-0.32101776 -0.11065824,-0.503622 -0.0021420000000000002,-0.36926064 0.33487271999999996,-0.64839852 1.02114306,-0.84576744 0.31053708,-0.08931006000000001 0.35032409999999997,-0.12557538000000001 0.14686056,-0.13385988000000001 -0.1534869,-0.0062496 -0.34258266000000004,-0.1300446 -0.42021378000000004,-0.27509958 -0.22069404,-0.41237028000000003 -0.045434340000000004,-0.81701046 0.4571658,-1.05550956 0.68287338,-0.32405058 0.9351153,-0.6345591840000001 0.9351153,-1.151127054 0.0,-0.334582668 -0.08304282,-0.519687378 -0.315,-0.7021450800000001 -0.34376706,-0.270407592 -0.39978539999999996,-0.6615482580000001 -0.16769592000000003,-1.170928836 0.12946626,-0.284147262 0.10754982,-0.36497034 -0.18098388,-0.667428678 -0.5979582,-0.62681535 -0.7453656000000001,-1.449815724 -0.44267076,-2.471512806 0.15005214,-0.5064815699999999 1.00722384,-1.483235838 2.13872148,-2.4370914960000003 0.43368318,-0.365596182 0.4558239,-0.417601044 0.32516694,-0.763750764 -0.11676546,-0.309347388 -0.09867312,-0.442684242 0.10822517999999999,-0.79760898 0.2436777,-0.41801810400000006 0.26660088000000004,-0.42686418600000003 1.198797642,-0.462615678 1.2535903800000001,-0.048077568 1.291752,-0.0012789 1.38127122,1.693847484 0.0090216,0.170880696 0.31682699999999997,0.520881354 0.8310645,0.9450000000000001 0.928683,0.76593321 1.37260494,1.433552778 1.53647928,2.310730002 0.1406034,0.7526170259999999 -0.0958356,1.649095056 -0.54663336,2.0725970580000004 -0.29721384,0.27921789 -0.30273894,0.310471938 -0.11802294,0.667672614 0.24160878,0.467219592 0.14537754,0.884342718 -0.26623926000000003,1.154044962 -0.65646504,0.43013187 -0.28827414,1.291365936 0.79938054,1.869830172 0.35389872,0.18822006000000002 0.40668390000000004,0.27703494 0.37271304,0.6271272 -0.0273168,0.28153187999999996 -0.1334403,0.4543875 -0.34264188,0.55809936 -0.29675268,0.1471176 -0.29214989999999996,0.15318828 0.22083768,0.29132082 0.59323446,0.15974154 0.96692148,0.6077068200000001 0.84014532,1.0071432 -0.11590740000000001,0.36519461999999997 -0.44943066,0.5083596 -1.38861198,0.5960619 -0.7912409400000001,0.0738864 -0.81830322,0.08793036 -0.81830322,0.42463386 0.0,0.69710004 0.40243392,3.48279246 0.63918162,4.424482439999999 0.32335127999999996,1.28616642 0.5606244,1.8124583399999998 1.52422452,3.3808572 1.51451874,2.46509802 1.6351183800000002,3.25018764 0.6720953399999999,4.375264319999999 -0.24282594,0.28368648 -0.44150148,0.56886858 -0.44150148,0.63373716 0.0,0.26496918 0.5205501,0.5284818 2.0275567199999998,1.0263884399999998 1.85804388,0.61388712 2.24726922,0.9165895199999999 2.34994914,1.82756448 0.08257536,0.73260558 -0.15103872000000002,1.10538414 -0.94587318,1.50933006 l -0.59640084,0.30310056 0.50988546,0.13729841999999998 c 1.4397982200000001,0.38769696000000003 1.75850892,2.16524574 0.5232654,2.91841704 -0.38951136,0.23749992 -0.69150438,0.24587514 -8.7823827,0.24355926 -7.375854402,-0.0021168 -8.427292902000001,-0.02621052 -8.782377282,-0.20130138 z"

            // gard
            if (board_size > 50) {
                return
            }

            // paper
            const paper = Raphael(tgt_node, draw_area_size + os * 2, draw_area_size + os * 2)

            // draw grid
            for (let i = 0; i < board_size; i += 1) {
                for (let j = 0; j < board_size; j += 1) {
                    paper.rect(j * unit + os, i * unit + os, unit, unit).attr(attr.grid).attr({'stroke-width': (1 * scale) + 'px'})
                }
            }

            // draw bishop_moves
            const moves = new Set()
            bishops.forEach(bishop=> {
                draw_bishop_moves(...bishop.values, scale)
            })

            // draw bishop
            bishops.forEach(bishop=> {
                draw_bishop(...bishop.values, scale)
            })

            // draw numbers
            let number = 0
            for (let y = 0; y < board_size; y += 1) {
                for (let x = 0; x < board_size; x += 1) {
                    if (!moves.has(x + ',' + y)) {
                        number += 1
                        paper.rect(unit * x + os, unit * y + os, unit, unit).attr(attr.number_cell).attr({'stroke-width': (1 * scale) + 'px'})
                        paper.text(unit * (x + .5) + os, unit * (y + .5) + os, number).attr(
                            attr.number).attr({'font-size': 16 * (5 / board_size) + 'px'})
                    }
                }
            }

            /**
            * 
            * svg coordinates scaling
            * 
            */
            function scaling(d1, scale){
                let result = ''
                let digit = ''
                d1.split('').forEach(d=>{
                    if ('0123456789.-'.indexOf(d) > -1){
                        digit += d
                    } else {
                        if (digit != ''){
                            result += parseFloat(digit) * scale
                            digit = ''
                        }
                        result += d
                    }
                })
                if (digit != ''){
                    result += parseFloat(digit) * scale
                }
                return result
            }

            /**
            *
            * draw bishop
            *
            */
            function draw_bishop(bx, by, scale) {
                const bishop = paper.path(scaling(b1, scale)).attr(attr.bishop)
                tx = bx * unit + 7 * scale + os
                ty = by * unit + 0 * scale + os
                bishop.transform(`s1t${tx},${ty}`)
            }

            /**
            *
            * draw bishop moves
            *
            */
            function draw_bishop_moves(bx, by, scale) {
                const current_coord = [unit * (bx + .5) + os, unit * (by + .5) + os]
                // *
                //  \ 
                if (bx > 0 && by > 0) {
                    let x_def = bx - Math.max(0, bx - by) + 1
                    while (x_def--) {
                        moves.add((bx - x_def) + ',' + (by - x_def))
                    }
                    paper.path([
                        'M', ...current_coord, 'L',
                        unit * (Math.max(0, bx - by)) + os,
                        unit * (Math.max(0, by - bx)) + os,
                    ]).attr(attr.move).attr({'stroke-width': (1 * scale) + 'px'})
                }
                //  *
                // / 
                if (bx < board_size - 1 && by > 0) {
                    let x_def = Math.min(bx + by, board_size - 1) - bx + 1
                    while (x_def--) {
                        moves.add((bx + x_def) + ',' + (by - x_def))
                    }
                    paper.path([
                        'M', ...current_coord, 'L',
                        unit * (Math.min(bx + by, board_size - 1) + 1) + os,
                        unit * (Math.max(0, by - ((board_size - 1) - bx))) + os,
                    ]).attr(attr.move).attr({'stroke-width': (1 * scale) + 'px'})
                }
                //  /
                // * 
                if (bx > 0 && by < board_size - 1) {
                    let x_def = bx - Math.max(0, bx - ((board_size - 1) - by)) + 1
                    while (x_def--) {
                        moves.add((bx - x_def) + ',' + (by + x_def))
                    }
                    paper.path([
                        'M', ...current_coord, 'L',
                        unit * (Math.max(0, bx - ((board_size - 1) - by))) + os,
                        unit * (Math.min(board_size - 1, by + bx) + 1) + os,
                    ]).attr(attr.move).attr({'stroke-width': (1 * scale) + 'px'})
                }
                // \ 
                //  * 
                if (bx < board_size - 1 && by < board_size - 1) {
                    let x_def = Math.min(board_size - 1, bx + ((board_size - 1) - by)) - bx + 1
                    while (x_def--) {
                        moves.add((bx + x_def) + ',' + (by + x_def))
                    }
                    paper.path([
                        'M', ...current_coord, 'L',
                        unit * (Math.min(board_size - 1, bx + ((board_size - 1) - by)) + 1) + os,
                        unit * (Math.min(board_size - 1, by + ((board_size - 1) - bx)) + 1) + os,
                    ]).attr(attr.move).attr({'stroke-width': (1 * scale) + 'px'})
                }
            }
        }
        var io = new extIO({
            animation: function ($expl, data) {
                dangerous_bishops_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
