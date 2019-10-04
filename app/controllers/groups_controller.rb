class GroupsController < ApplicationController
  def search
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def index
  end
  
  def new
    @group = Group.new
    @group.users << current_user
  end

  def edit
    @group = Group.find(params[:id])
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group.id), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  


  private
  def group_params
    params.require(:group).permit(:name , {:user_ids => []})
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
