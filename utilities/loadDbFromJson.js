var data = {
    tables: {
        user: [
            { fName: 'Amy', lName: 'Adammo', email: 'amy@vulcan.com' },
            { fName: 'Borris', lName: 'Bladcheck', email: 'borris@vulcan.com' },
            { fName: 'Cayo', lName: 'Carissian', email: 'cayo@vulcan.com' },
            { fName: 'Dun', lName: 'Ding', email: 'dun@vulcan.com' },
            { fName: 'Ezikial', lName: 'ENright', email: 'ez@vulcan.com' },


        ],
        staff: [
            { fName: 'Bob', lName: 'Boiko', email: 'bbboiko@uw.edu', title: 'FAKS Program Lead' },
            { fName: 'Helene', lName: 'Williams', email: 'helene@uw.edu', title: 'Research Lead' },
            { fName: 'Jesse', lName: 'Van Hoy', email: 'jesse@uw.edu', title: 'Researcher' },

        ],
        knowledgearea: [
            { id: 'envDna', name: 'Environmental DNA', shortDesc: 'This is the short desciption of the area. No more than a couple of sentences' },
            { id: 'newSpecies', name: 'New species', shortDesc: 'This is the short desciption of the area. No more than a couple of sentences' },
            { id: 'illegalFishing', name: 'Organized criminal networks in illegal fishing', shortDesc: 'This is the short desciption of the area. No more than a couple of sentences' },
            { id: 'marineProtectred', name: 'Marine protected areas', shortDesc: 'This is the short desciption of the area. No more than a couple of sentences' },
            { id: 'biodiversity', name: 'Biodiversity modeling', shortDesc: 'This is the short desciption of the area. No more than a couple of sentences' },
        ],
        question: [
            { id: 1, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are the applications of Environmental DNA?', askedById: '4', answeredById: 2, status: 'answered' },
            { id: 2, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What is its utility for conservation?', askedById: '4', answeredById: 2, status: 'answered' },
            { id: 3, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What is its utility for law enforcement?', askedById: '4', answeredById: 2, status: 'answered' },
            { id: 4, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are some innovative use cases?', askedById: '4', answeredById: 2, status: 'answered' },
            { id: 5, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'How is it/ can it be used on land?', askedById: '4', answeredById: 2, status: 'answered' },
            { id: 6, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'How is it/ can it be used in the oceans?', askedById: '4', answeredById: 2, status: 'answered' },
            { id: 7, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are the current trends? (include miniaturization/ portability / “ruggedization” for field use)?', askedById: '4', answeredById: 2, status: 'answered' },
            { id: 8, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are good secondary sources?', askedById: '4', answeredById: 2, status: 'answered' },
            { id: 9, areaId: 'envDna', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'Who are the best experts?', askedById: '4', answeredById: 2, status: 'answered' },

            { id: 10, areaId: 'newSpecies', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What is the case for investing in new species discoveries?', askedById: '6', answeredById: 2, status: 'answered' },
            { id: 11, areaId: 'newSpecies', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'Are there good examples of recent (5-10 years) new species discovery that have led to tangible benefits (include pharma/medicine, biomimicry technology, engineering, new conservation techniques or significant new understanding)?', askedById: '6', answeredById: 2, status: 'answered' },

            { id: 12, areaId: 'illegalFishing', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: ' What is the scale and impact of this phenomenon?', askedById: '5', answeredById: 2, status: 'answered' },
            { id: 13, areaId: 'illegalFishing', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What is the cost to global fisheries?', askedById: '5', answeredById: 2, status: 'answered' },
            { id: 14, areaId: 'illegalFishing', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'How does is it organized and how does it function?', askedById: '5', answeredById: 2, status: 'answered' },
            { id: 15, areaId: 'illegalFishing', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are the current systems for responding and what technology is used to respond?', askedById: '5', answeredById: 2, status: 'answered' },
            { id: 16, areaId: 'illegalFishing', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What lessons have been learned from engaging the networks?', askedById: '5', answeredById: 2, status: 'answered' },
            { id: 17, areaId: 'illegalFishing', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'Who are the leading authors or organizations in the field?', askedById: '5', answeredById: 2, status: 'answered' },
            { id: 18, areaId: 'illegalFishing', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are good secondary sources?', askedById: '5', answeredById: 2, status: 'answered' },

            { id: 19, areaId: 'marienProtectred', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'How many are there? What is their typology and how much area do they cover? ', askedById: 7, answeredById: 2, status: 'answered' },
            { id: 20, areaId: 'marienProtectred', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are the different types of legal frameworks that cover them?', askedById: '7', answeredById: 2, status: 'answered' },
            { id: 21, areaId: 'marienProtectred', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are the surveillance approaches and technology applications in support of MPA?', askedById: '7', answeredById: 2, status: 'answered' },
            { id: 22, areaId: 'marienProtectred', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are some examples of highly effective MPA management/surveillance/enforcement.', askedById: '7', answeredById: 2, status: 'answered' },
            { id: 23, areaId: 'marienProtectred', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are the best primary resources on MPAs?  ', askedById: '7', answeredById: 2, status: 'answered' },
            { id: 24, areaId: 'marienProtectred', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are the best secondary sources on MPAs?', askedById: '7', answeredById: 2, status: 'answered' },

            { id: 25, areaId: 'biodiversity', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What models exist (aside from we know of Madingly and PREDICTS but are there other similar models?)', askedById: '3', answeredById: 2, status: 'answered' },
            { id: 26, areaId: 'biodiversity', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'Is there any expert commentary on the top models?', askedById: '3', answeredById: 2, status: 'pending' },
            { id: 27, areaId: 'biodiversity', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'What are the opportunities/flaws in the models?', askedById: '3', answeredById: 2, status: 'pending' },
            { id: 28, areaId: 'biodiversity', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'Are there good secondary sources that discuss the opportunities and limits of biodiversity modelling?  ', askedById: '3', answeredById: 2, status: 'answered' },
            { id: 29, areaId: 'biodiversity', originationDateTime: '2017-06-11T18:25:43', lastUpdateDateTime: '2017-06-12T18:25:43', question: 'Who are the leading experts in the field?', askedById: '3', answeredById: 2, status: 'answered' },

        ],
    
    }
}





var db = require('..//db')
db.connect(db.MODE_PRODUCTION, function () {
    db.fixtures(data, function (err) {
        if (err) return console.log(err)
        console.log('Data has been loaded...')
    })
})

