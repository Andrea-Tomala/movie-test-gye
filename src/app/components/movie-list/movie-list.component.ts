import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies: any[] = [];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';
  currentPage: number = 1;

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'] ? +params['page'] : 1;
      this.loadMovies(page);
    });
  }

  loadMovies(page: number): void {
    this.movieService.getPopularMovies(page).subscribe(response => {
      // this.movies = response.results;
      this.movies = response.results.slice(0, 8);
      this.currentPage = page;
      this.movieService.currentPage = page;
    });
  }

  nextPage(): void {
    //this.currentPage++;
    this.movieService.currentPage++;
    this.updateUrl();
    this.loadMovies(this.movieService.currentPage);
  }

  previousPage(): void {
  /*   if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies(this.movieService.currentPage);
    } */
    if (this.movieService.currentPage > 1) {
      this.movieService.currentPage--;
      this.updateUrl();
      this.loadMovies(this.movieService.currentPage);
    }
  }

  goToFirstPage(): void {
    this.movieService.currentPage = 1;
    this.updateUrl();
    this.loadMovies(this.movieService.currentPage);
  }

  private updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.movieService.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  viewDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

}
