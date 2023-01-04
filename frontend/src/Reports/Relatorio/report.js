import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function reportPDF(users){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Relatório',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] // left, top, right, bottom
        }
    ];

    const dados = users.map((users) => {
        return [
            {text: users.dia, fontSize: 9, margin: [0, 2, 0, 2]},
            {text: users.tempo, fontSize: 9, margin: [0, 2, 0, 2]},
            {text: users.descricao, fontSize: 9, margin: [0, 2, 0, 2]},
            {text: users.data, fontSize: 9, margin: [0, 2, 0, 2]}
        ] 
    });

    const details = [
        {
            table:{
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        {text: 'Dia de Semana', style: 'tableHeader', fontSize: 10},
                        {text: 'Duração', style: 'tableHeader', fontSize: 10},
                        {text: 'Descrição', style: 'tableHeader', fontSize: 10},
                        {text: 'Data', style: 'tableHeader', fontSize: 10}
                    ],
                    ...dados
                ]
            },
            layout: 'lightHorizontalLines' // headerLineOnly
        }
    ];

    function Rodape(currentPage, pageCount){
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0] // left, top, right, bottom
            }
        ]
    }

    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinitios).download('Relatório');
}

export default reportPDF;