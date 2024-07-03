import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies: any[] = [];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';
  currentPage: number = 1;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getPopularMovies(this.currentPage).subscribe(response => {
      // this.movies = response.results;
      this.movies = response.results.slice(0, 6);
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadMovies();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
    }
  }


  viewDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

}
