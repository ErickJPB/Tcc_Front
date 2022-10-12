import { Component, OnInit } from '@angular/core';
import {PoChartType, PoChartOptions, PoChartSerie, PoDialogService, PoMenuPanelItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private poAlert: PoDialogService) { }

  participationByCountryInWorldExportsType: PoChartType = PoChartType.Line;
  evolutionOfCoffeeAndSomeCompetitorsType: PoChartType = PoChartType.Column;
  coffeConsumingChartType: PoChartType = PoChartType.Donut;
  consumptionPerCapitaType: PoChartType = PoChartType.Bar;

  ngOnInit(): void {
  }

  coffeeConsumption: Array<PoChartSerie> = [
    { label: 'Anador', data: 9, tooltip: 'Anador (EuroFarma)' },
    { label: 'Dipirona', data: 7.2, tooltip: 'Dipirona (Teuto)' },
    { label: 'Finasterida', data: 6.7, tooltip: 'Finasterida (EMS)' },
    { label: 'Leite Ninho', data: 6.1, tooltip: 'Leite Ninho (Nestle)' },
    { label: 'Fralda', data: 5.5, tooltip: 'Fralda (Monica)' }
  ];

  showMeTheDates(event: any) {
   /* this.poAlert.alert({
      title: 'Statistic',
      message: `${event.label} consuming ${event.data}kg per capita!`,
      ok: () => {}
    });*/
  }
}
