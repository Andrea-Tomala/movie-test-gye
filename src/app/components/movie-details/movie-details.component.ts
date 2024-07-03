import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  credits: any;
  actors!: any[];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    this.movieService.getMovieDetails(movieId).subscribe(response => {
      this.movie = response;
    });
    this.movieService.getMovieCredits(movieId).subscribe(response => {
      this.credits = response.cast;
      //this.actors = this.credits.filter((actor: any) => actor.known_for_department === "Acting");

      // Filtrar solo los actores y tomar los primeros 10
      this.actors = response.cast
      .filter((actor: any) => actor.known_for_department === 'Acting')
      .slice(0, 10);
  });

  }

  backPage(){
    this.router.navigate(['/movies'], { queryParams: { page: this.movieService.currentPage } });
  }

}
