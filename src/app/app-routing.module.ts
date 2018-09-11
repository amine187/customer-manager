import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'customers',
        loadChildren: './customers/customers.module#CustomersModule'
    },
    {
        path: '**',
        loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }