import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Blog } from 'app/shared/model/blog.model';
import { BlogService } from './blog.service';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogUpdateComponent } from './blog-update.component';
import { BlogDeletePopupComponent } from './blog-delete-dialog.component';
import { IBlog } from 'app/shared/model/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogResolve implements Resolve<IBlog> {
    constructor(private service: BlogService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((blog: HttpResponse<Blog>) => blog.body);
        }
        return Observable.of(new Blog());
    }
}

export const blogRoute: Routes = [
    {
        path: 'blog',
        component: BlogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog/:id/view',
        component: BlogDetailComponent,
        resolve: {
            blog: BlogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog/new',
        component: BlogUpdateComponent,
        resolve: {
            blog: BlogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog/:id/edit',
        component: BlogUpdateComponent,
        resolve: {
            blog: BlogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blogPopupRoute: Routes = [
    {
        path: 'blog/:id/delete',
        component: BlogDeletePopupComponent,
        resolve: {
            blog: BlogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.blog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
