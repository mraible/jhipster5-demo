import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Entry } from 'app/shared/model/entry.model';
import { EntryService } from './entry.service';
import { EntryComponent } from './entry.component';
import { EntryDetailComponent } from './entry-detail.component';
import { EntryUpdateComponent } from './entry-update.component';
import { EntryDeletePopupComponent } from './entry-delete-dialog.component';
import { IEntry } from 'app/shared/model/entry.model';

@Injectable({ providedIn: 'root' })
export class EntryResolve implements Resolve<IEntry> {
    constructor(private service: EntryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((entry: HttpResponse<Entry>) => entry.body);
        }
        return Observable.of(new Entry());
    }
}

export const entryRoute: Routes = [
    {
        path: 'entry',
        component: EntryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entry/:id/view',
        component: EntryDetailComponent,
        resolve: {
            entry: EntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entry/new',
        component: EntryUpdateComponent,
        resolve: {
            entry: EntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entry/:id/edit',
        component: EntryUpdateComponent,
        resolve: {
            entry: EntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entryPopupRoute: Routes = [
    {
        path: 'entry/:id/delete',
        component: EntryDeletePopupComponent,
        resolve: {
            entry: EntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
