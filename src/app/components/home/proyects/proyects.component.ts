import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export interface Project {
  Title: string;
  Company?: string;
  Role?: string;
  Icon?: string;
  Description: string;
  imgs: string[];
  Technologies: string[];
}

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProyectsComponent implements OnInit, OnDestroy {

  projects: Project[] = [];

  /** Which project descriptions are expanded, by project index. */
  expanded: Record<number, boolean> = {};

  /** Current slide per project, by project index. */
  slide: Record<number, number> = {};

  /** Projects the visitor is hovering; their slideshow pauses. */
  paused: Record<number, boolean> = {};

  private timer: ReturnType<typeof setInterval>;
  private sub: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.sub = this.translate.stream('FeatureProjects.Projects').subscribe((p: Project[]) => {
      this.projects = Array.isArray(p) ? p : [];
      this.slide = {};
    });
    this.timer = setInterval(() => this.advance(), 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.sub?.unsubscribe();
  }

  goTo(i: number, n: number): void {
    this.slide[i] = n;
  }

  private advance(): void {
    this.projects.forEach((p, i) => {
      const count = p.imgs?.length || 0;
      if (count > 1 && !this.paused[i]) {
        this.slide[i] = ((this.slide[i] || 0) + 1) % count;
      }
    });
  }
}
