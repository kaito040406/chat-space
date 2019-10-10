class Api::GroupsController < ApplicationController
  def index
    @groups = Group.all
    @messagee = Message.all
  end
end