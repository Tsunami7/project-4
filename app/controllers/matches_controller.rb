class MatchesController < ApplicationController
  before_action :set_match, only: [:show, :update, :destroy]
  # before_action :authorize_request #, except: %i[index show]  # cannot get current user without auth
  before_action :authorize_request #, except: %i[create]  

  # GET /matches
  def index
    # i need to filter matches by the current user here
    # how do i get the current, logged in ,user here?
    # @user = @current_user
    # what do we need to know to google this?
    # ruby rails
    # what gems are being used to identify the user? 
    # jwt and bcrypt
    # we need to authroize_request to get @current user
    # @matches = Match.all
    @matches = @current_user.matches # we put the logic in the user model

    # render json: @current_user
    render json: @matches, include: [:comments]
  end

  # GET /matches/1
  def show
    
    render json: @match, include: [:comments]
  end

  def random
    render json: User.random 
  end

  # POST /matches
  def create
    @match = Match.new(match_params)

    if @match.save
      render json: @match, status: :created, location: @match
    else
      render json: @match.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /matches/1
  def update
    if @match.update(match_params)
      render json: @match
    else
      render json: @match.errors, status: :unprocessable_entity
    end
  end

  # DELETE /matches/1
  def destroy
    @match.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_match
      @match = Match.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def match_params
      params.require(:match).permit(:post_comment, :user1_id, :user2_id)
    end
end
