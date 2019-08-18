// I haven't found many good sources for estimates of buying stuff
// I'm going to take the average of various different estimates I've found

//http://energyskeptic.com/2015/how-much-energy-does-it-take-to-make-a-car-by-david-fridley-lbl/

import { convert } from './convert'

let estimates = [
    {   "type_of_stuff": "Aluminium drink cans",
        "kwh_per_£":  0.6/0.5, // 0.6kwh divided by 50p.  Note this is similar for plastic bottles
        "source": "https://www.withouthotair.com/c15/page_89.shtml",
        "weight": 0.5
    },
    {   "type_of_stuff": "computers",
        "kwh_per_£": 1800/1000,  //1800kwh divided by an assumed purchase price of £1000
        "source": "https://www.withouthotair.com/c15/page_89.shtml",
        "weight": 1
    },
    {   "type_of_stuff": "batteries",
        "kwh_per_£": 1.4/1.5,  //They cost about 1.4
        "source": "https://www.withouthotair.com/c15/page_89.shtml",
        "weight": 0.5
    },
    {   "type_of_stuff": "Newspapers",
        "kwh_per_£": (10*0.2)/2,
        "source": "https://www.withouthotair.com/c15/page_90.shtml",
        "weight": 1
    },
    {   "type_of_stuff": "car",
        "kwh_per_£": ((33097 + 46431 + 76000)/3) / 17500,  // Energy skeptic hsa 119,150 MJ = 33097kwh for an american car and 167,150 MJ = 46431kwh for chinese car.  Withouthotair has 76 000 kwh for car.  average car cost from nimblefins
        "source": "https://www.nimblefins.co.uk/average-cost-cars-uk and https://www.withouthotair.com/c15/page_90.shtml and http://energyskeptic.com/2015/how-much-energy-does-it-take-to-make-a-car-by-david-fridley-lbl/" ,
        "weight": 2
    },
    {   "type_of_stuff": "smartphone",
        "kwh_per_£": convert.convert_units('j', 'kwh') * 1000 * 1e6 / 250,
        "source":    "https://energyeducation.ca/encyclopedia/Embodied_energy",
        "weight": 1
    },
    {
        "type_of_stuff": "laptop",
        "kwh_per_£": convert.convert_units('j', 'kwh') * (4500 * 1e6) / 1500,
        "source": "https://energyeducation.ca/encyclopedia/Embodied_energy",
        "weight": 1
    },
    {
        "type_of_stuff": "washing machine",
        "kwh_per_£": convert.convert_units('j', 'kwh') * (3900 * 1e6) / 450,
        "source": "https://energyeducation.ca/encyclopedia/Embodied_energy",
        "weight": 1
    },
    {
        "type_of_stuff": "fridge",
        "kwh_per_£": convert.convert_units('j', 'kwh') * (5900 * 1e6) / 500,  // American fridges are probably expensive!
        "source": "https://energyeducation.ca/encyclopedia/Embodied_energy",
        "weight": 1
    }
]

function get_average_kwh_per_pound_sterling() {

    let total_weight = estimates.reduce((a,b) => a + b["weight"],0)
    let contributions = estimates.map(d => (d["weight"]/total_weight * d["kwh_per_£"]))
    let average = contributions.reduce((a,b) => a+b,0)
    return average
}

function pounds_sterling_to_kwh(pounds_sterling) {
    return pounds_sterling * get_average_kwh_per_pound_sterling()
}

export let stuff = {
    '_estimates': estimates,
    '_get_average_kwh_per_pound_sterling': get_average_kwh_per_pound_sterling,
    'pounds_sterling_to_kwh': pounds_sterling_to_kwh
};